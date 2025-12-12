"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FaCar, FaMoneyBillWave, FaTimes, FaSpinner, FaInfoCircle, FaCreditCard } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";

// API base URL
const API_BASE_URL = "http://localhost:5000/api/instantpay";

export default function FastagForm({ categoryKey }) {
    const router = useRouter();

    const [tokan, settoken] = useState()
    useEffect(() => {
        const tokenn = localStorage.getItem("token")
        if (tokenn) {
            settoken(tokenn)
        } else {
            router.push("login")
        }
    }, [])
    const [providers, setProviders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetchingBill, setFetchingBill] = useState(false);
    const [processingPayment, setProcessingPayment] = useState(false);

    const [provider, setProvider] = useState("");
    const [billerInfo, setBillerInfo] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [billAmount, setBillAmount] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [showPaymentForm, setShowPaymentForm] = useState(false);

    // New state for API responses
    const [customerName, setCustomerName] = useState("");
    const [billNumber, setBillNumber] = useState("");
    const [enquiryReferenceId, setEnquiryReferenceId] = useState("");
    const [externalRef, setExternalRef] = useState("");
    const [selectedBiller, setSelectedBiller] = useState(null);

    // State for biller details - COMPLETELY DYNAMIC
    const [billerDetails, setBillerDetails] = useState(null);
    const [billerParams, setBillerParams] = useState([]);
    const [inputFields, setInputFields] = useState({});
    const [inputErrors, setInputErrors] = useState({});
    const [billerInputConfig, setBillerInputConfig] = useState({});

    // Payment form state
    const [paymentMode, setPaymentMode] = useState("");
    const [paymentModes, setPaymentModes] = useState([]);
    const [initChannels, setInitChannels] = useState([]);
    const [initChannel, setInitChannel] = useState("");
    const [mpin, setMpin] = useState("");
    const [transactionAmount, setTransactionAmount] = useState(0);
    const [paymentInfo, setPaymentInfo] = useState({});

    // Generate external reference
    const generateExternalRef = () => {
        return `REF${Date.now()}${Math.floor(Math.random() * 1000)}`;
    };

    // Fetch billers on component mount
    useEffect(() => {
        fetchBillers();
    }, []);

    // Fetch all FASTag billers
    const fetchBillers = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/billers`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    filters: {
                        categoryKey: categoryKey
                    }
                }),
            });

            const data = await response.json();

            if (data.success && data.data.data.records) {
                // Filter only active billers
                const activeBillers = data.data.data.records.filter(
                    biller => biller.billerStatus === "ACTIVE" && biller.isAvailable
                );
                setProviders(activeBillers);
            }
        } catch (error) {
            console.error("Error fetching billers:", error);
            // Fallback to static providers if API fails
            setProviders([
                { billerId: "fastag1", billerName: "HDFC FASTag" },
                { billerId: "fastag2", billerName: "ICICI FASTag" },
                { billerId: "fastag3", billerName: "Axis FASTag" },
            ]);
        } finally {
            setLoading(false);
        }
    };

    // Fetch biller details when provider is selected
    useEffect(() => {
        if (provider) {
            fetchBillerDetails(provider);
        } else {
            resetBillerState();
        }
    }, [provider]);

    // Reset all biller-related state
    const resetBillerState = () => {
        setBillerDetails(null);
        setBillerParams([]);
        setPaymentModes([]);
        setInitChannels([]);
        setInitChannel("");
        setPaymentMode("");
        setInputFields({});
        setInputErrors({});
        setPaymentInfo({});
        setBillerInputConfig({});
    };

    const fetchBillerDetails = async (billerId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/biller-details`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    billerId: billerId
                }),
            });

            const data = await response.json();
            console.log("Biller details response:", data);

            if (data.success) {
                const details = data?.data?.data;
                setBillerDetails(details);
                const billerInfo = details.billerInfo.type || {};

                // Store the selected biller
                const biller = providers.find(p => p.billerId === billerId);
                setSelectedBiller(biller);

                // COMPLETELY DYNAMIC HANDLING OF PARAMETERS
                if (details.parameters && details.parameters.length > 0) {
                    // Store parameters
                    setBillerParams(details.parameters);

                    // Initialize input fields and validation config
                    const initialFields = {};
                    const inputConfig = {};

                    details.parameters.forEach(param => {
                        // Initialize field value
                        initialFields[param.name] = "";

                        // Store validation configuration for this parameter
                        inputConfig[param.name] = {
                            desc: param.desc,
                            minLength: param.minLength || 0,
                            maxLength: param.maxLength || 999,
                            inputType: param.inputType || "ALL",
                            mandatory: param.mandatory || 0,
                            regex: param.regex || "^.*$",
                            // Store compiled regex for validation
                            compiledRegex: param.regex ? new RegExp(param.regex) : null
                        };
                    });

                    setInputFields(initialFields);
                    setBillerInputConfig(inputConfig);
                }

                // DYNAMIC PAYMENT MODES HANDLING
                if (details.paymentModes && details.paymentModes.length > 0) {
                    setPaymentModes(details.paymentModes);
                    setPaymentMode(details.paymentModes[0]?.name || "");

                    // Initialize payment info fields dynamically
                    const initialPaymentInfo = {};
                    details.paymentModes.forEach(mode => {
                        if (mode.paymentInfo) {
                            mode.paymentInfo.forEach(info => {
                                initialPaymentInfo[info.name] = "";
                            });
                        }
                    });
                    setPaymentInfo(initialPaymentInfo);
                }

                // DYNAMIC INIT CHANNELS HANDLING
                if (details.initChannels && details.initChannels.length > 0) {
                    setInitChannels(details.initChannels);
                    setInitChannel(details.initChannels[0]?.name || "");
                }
            }
        } catch (error) {
            console.error("Error fetching biller details:", error);
        }
    };

    // Generic input field handler - works for ANY parameter
    const handleInputChange = (paramName, value) => {
        const config = billerInputConfig[paramName];

        if (!config) {
            // If no config, just update the field
            setInputFields(prev => ({
                ...prev,
                [paramName]: value
            }));
            return;
        }

        // Clean input based on inputType
        let cleanedValue = value;

        switch (config.inputType) {
            case "NUMERIC":
                cleanedValue = value.replace(/\D/g, '');
                break;
            case "ALPHANUMERIC":
                cleanedValue = value.replace(/[^a-zA-Z0-9]/g, '');
                break;
            case "ALL":
            default:
                cleanedValue = value;
                break;
        }

        setInputFields(prev => ({
            ...prev,
            [paramName]: cleanedValue
        }));

        // Clear error for this field
        setInputErrors(prev => ({
            ...prev,
            [paramName]: ""
        }));
    };

    // DYNAMIC VALIDATION - works for ANY biller and ANY parameters
    const validateInputs = () => {
        const errors = {};
        let isValid = true;

        // Iterate through all configured parameters
        Object.keys(billerInputConfig).forEach(paramName => {
            const config = billerInputConfig[paramName];
            const value = inputFields[paramName] || "";

            // Check if field is mandatory
            if (config.mandatory === 1 && !value.trim()) {
                errors[paramName] = `${config.desc} is required`;
                isValid = false;
                return;
            }

            if (value.trim()) {
                // Check min length
                if (value.length < config.minLength) {
                    errors[paramName] = `Minimum ${config.minLength} characters required`;
                    isValid = false;
                }
                // Check max length
                else if (value.length > config.maxLength) {
                    errors[paramName] = `Maximum ${config.maxLength} characters allowed`;
                    isValid = false;
                }
                // Check regex pattern if available and not the default "^.*$"
                else if (config.regex && config.regex !== "^.*$" && config.compiledRegex) {
                    try {
                        if (!config.compiledRegex.test(value)) {
                            errors[paramName] = `Invalid format for ${config.desc}`;
                            isValid = false;
                        }
                    } catch (error) {
                        console.error(`Invalid regex pattern for ${paramName}:`, config.regex);
                    }
                }
            }
        });

        setInputErrors(errors);
        return isValid;
    };

    // Get device info dynamically for any init channel
    const getDynamicDeviceInfo = (channelName) => {
        const selectedChannel = initChannels.find(ch => ch.name === channelName);
        const deviceInfo = {};

        if (selectedChannel && selectedChannel.deviceInfo) {
            selectedChannel.deviceInfo.forEach(device => {
                // Provide dynamic default values based on device requirements
                switch (device.name.toLowerCase()) {
                    case "terminalid":
                    case "terminal_id":
                        deviceInfo[device.name] = "TERM001";
                        break;
                    case "mobile":
                    case "mobilenumber":
                        deviceInfo[device.name] = "9876543210";
                        break;
                    case "geocode":
                    case "geo_code":
                        deviceInfo[device.name] = "19.0760,72.8777";
                        break;
                    case "postalcode":
                    case "postal_code":
                        deviceInfo[device.name] = "400001";
                        break;
                    case "latitude":
                        deviceInfo[device.name] = "19.0760";
                        break;
                    case "longitude":
                        deviceInfo[device.name] = "72.8777";
                        break;
                    default:
                        // For unknown device fields, provide an empty string
                        deviceInfo[device.name] = "";
                }
            });
        }

        return deviceInfo;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!provider) return;

        // Validate inputs dynamically
        if (!validateInputs()) {
            return;
        }

        setFetchingBill(true);

        // Generate new external reference for each enquiry
        const newExternalRef = generateExternalRef();
        setExternalRef(newExternalRef);

        try {
            // Prepare parameters for pre-enquiry - DYNAMIC
            const params = {};
            Object.keys(inputFields).forEach(fieldName => {
                if (inputFields[fieldName]) {
                    params[fieldName] = inputFields[fieldName];
                }
            });

            // Get device info dynamically
            const deviceInfo = getDynamicDeviceInfo(initChannel);

            const requestBody = {
                billerId: provider,
                externalRef: newExternalRef,
                initChannel: initChannel || (initChannels[0]?.name || "AGT"),
                ...params,
                ...deviceInfo
            };

            console.log("Pre-enquiry request:", requestBody);

            const response = await fetch(`${API_BASE_URL}/pre-enquiry`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            const data = await response.json();
            console.log("Pre-enquiry response:", data);

            if (data.success && data.data.statuscode === "TXN") {
                const enquiryData = data.data.data;

                // Set the bill details from API response
                // Handle different response field names dynamically
                const possibleNameFields = ['CustomerName', 'customerName', 'name', 'AccountHolderName', 'accountHolderName'];
                const possibleAmountFields = ['Amount', 'amount', 'DueAmount', 'dueAmount', 'BillAmount', 'billAmount'];
                const possibleBillNumberFields = ['BillNumber', 'billNumber', 'ReferenceNumber', 'referenceNumber'];

                let foundName = "N/A";
                let foundAmount = 0;
                let foundBillNumber = "N/A";

                // Dynamically find the correct field names
                possibleNameFields.forEach(field => {
                    if (enquiryData[field] && foundName === "N/A") {
                        foundName = enquiryData[field];
                    }
                });

                possibleAmountFields.forEach(field => {
                    if (enquiryData[field] && foundAmount === 0) {
                        foundAmount = parseFloat(enquiryData[field]) || 0;
                    }
                });

                possibleBillNumberFields.forEach(field => {
                    if (enquiryData[field] && foundBillNumber === "N/A") {
                        foundBillNumber = enquiryData[field];
                    }
                });

                setCustomerName(foundName);
                setBillNumber(foundBillNumber);
                setBillAmount(foundAmount);
                setEnquiryReferenceId(enquiryData.enquiryReferenceId || enquiryData.referenceId || "");
                setTransactionAmount(foundAmount);

                setSubmitted(true);
            } else {
                const errorMessage = data.data?.status || data.message || "Failed to fetch bill details. Please try again.";
                alert(errorMessage);
            }
        } catch (error) {
            console.error("Error fetching bill:", error);
            alert("Error fetching bill details. Please check your network connection.");
        } finally {
            setFetchingBill(false);
        }
    };

    const handlePayBill = () => {
        setShowPaymentForm(true);
    };

    // Handle payment info changes dynamically
    const handlePaymentInfoChange = (infoName, value) => {
        setPaymentInfo(prev => ({
            ...prev,
            [infoName]: value
        }));
    };

    const handlePaymentSubmit = async (e) => {
        e.preventDefault();

        if (!selectedBiller || !enquiryReferenceId || !externalRef) {
            alert("Missing payment information. Please generate bill again.");
            return;
        }

        // Validate transaction amount
        if (!transactionAmount || transactionAmount <= 0) {
            alert("Please enter a valid transaction amount");
            return;
        }

        // Check amount based on biller's payment amount exactness
        if (billerDetails?.paymentAmountExactness === "EXACT") {
            if (parseFloat(transactionAmount) !== parseFloat(billAmount)) {
                alert(`Exact amount of ₹${billAmount} is required for this biller.`);
                return;
            }
        } else if (billerDetails?.paymentAmountExactness === "EXACT_UP") {
            if (parseFloat(transactionAmount) < parseFloat(billAmount)) {
                if (!confirm(`The amount entered (₹${transactionAmount}) is less than the bill amount (₹${billAmount}). Do you want to continue?`)) {
                    return;
                }
            }
        }

        setProcessingPayment(true);

        try {
            // Get payment mode details dynamically
            const selectedPaymentMode = paymentModes.find(mode => mode.name === paymentMode);

            // Get device info dynamically
            const deviceInfo = getDynamicDeviceInfo(initChannel);

            // Prepare payment info dynamically
            const paymentModeInfo = {};
            if (selectedPaymentMode && selectedPaymentMode.paymentInfo) {
                selectedPaymentMode.paymentInfo.forEach(info => {
                    paymentModeInfo[info.name] = paymentInfo[info.name] || "";
                });
            }

            // Build payment payload dynamically
            const paymentPayload = {
                billerId: selectedBiller,
                externalRef: externalRef,

                enquiryReferenceId: enquiryReferenceId,
                // Include all input parameters dynamically
                inputParameters: {
                    ...Object.keys(inputFields).reduce((acc, key) => {
                        if (inputFields[key]) {
                            acc[key] = inputFields[key];
                        }
                        return acc;
                    }, {})
                },
                transactionAmount: parseFloat(transactionAmount),
                paymentMode: paymentMode,
                initChannel: initChannel,
                ...deviceInfo,
                ...paymentModeInfo,
                mpin: "111111",
                category: billerDetails?.category?.name
            };

            console.log("Payment Payload:", paymentPayload);

            const response = await fetch(`${API_BASE_URL}/payment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${tokan}`,
                },
                body: JSON.stringify(paymentPayload),
            });

            const data = await response.json();
            console.log("Payment response:", data);

            if (data.success && data.data.statuscode === "TXN") {
                setShowPaymentForm(false);
                setShowModal(true);
            } else {
                const errorMessage = data.message || "Payment failed. Please try again.";
                toast.error(errorMessage);
            }
        } catch (error) {
            console.error("Error processing payment:", error);
            alert("Payment processing error. Please try again.");
        } finally {
            setProcessingPayment(false);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setShowPaymentForm(false);
        // Reset form after successful payment
        handleReset();
    };

    const handleReset = () => {
        setProvider("");
        resetBillerState();
        setSubmitted(false);
        setCustomerName("");
        setBillNumber("");
        setBillAmount(0);
        setEnquiryReferenceId("");
        setExternalRef("");
        setSelectedBiller(null);
        setMpin("");
        setTransactionAmount(0);
    };

    // Get input type based on parameter dynamically
    const getInputType = (inputType) => {
        switch (inputType?.toUpperCase()) {
            case "NUMERIC": return "tel";
            case "ALPHANUMERIC": return "text";
            case "PASSWORD": return "password";
            case "EMAIL": return "email";
            case "TEL": return "tel";
            case "ALL":
            default: return "text";
        }
    };

    // Format regex pattern for display - handles ANY regex pattern
    const formatRegexForDisplay = (regex) => {
        if (!regex || regex === "^.*$" || regex === "^") return "Any valid input";

        try {
            let display = regex;

            // Remove regex delimiters
            display = display.replace(/^\^|\$$/g, '');

            // Simplify character classes
            display = display.replace(/\[(\d)-(\d)\]/g, "numbers $1-$9");
            display = display.replace(/\[(\w)-(\w)\]/g, "letters $1-$2");
            display = display.replace(/\[A-Za-z\]/g, "letters A-Z");
            display = display.replace(/\[0-9\]/g, "numbers 0-9");
            display = display.replace(/\[5-9\]/g, "numbers 5-9");

            // Simplify quantifiers
            display = display.replace(/\{(\d+),(\d+)\}/g, "$1 to $2 times");
            display = display.replace(/\{(\d+)\}/g, "exactly $1 times");
            display = display.replace(/\+/g, "1 or more times");
            display = display.replace(/\*/g, "0 or more times");
            display = display.replace(/\?/g, "0 or 1 time");

            // Simplify anchors
            display = display.replace(/\|/g, " OR ");

            // Escape special characters that might be confusing
            display = display.replace(/\(/g, "( ");
            display = display.replace(/\)/g, " )");

            return display.length > 50 ? display.substring(0, 47) + "..." : display;
        } catch (error) {
            return "Custom pattern";
        }
    };

    // Render input field dynamically for ANY parameter
    const renderInputField = (paramName) => {
        const config = billerInputConfig[paramName];
        const value = inputFields[paramName] || "";
        const error = inputErrors[paramName];

        if (!config) return null;

        return (
            <div key={paramName} className="space-y-1">
                <label className="block text-gray-700 font-medium">
                    {config.desc}
                    {config.mandatory === 1 && <span className="text-red-500 ml-1">*</span>}
                </label>
                <div className="relative">
                    <input
                        type={getInputType(config.inputType)}
                        value={value}
                        onChange={(e) => handleInputChange(paramName, e.target.value)}
                        placeholder={`Enter ${config.desc.toLowerCase()}`}
                        className={`w-full border rounded-lg p-2 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${error ? "border-red-500" : "border-gray-300"
                            } ${submitted ? "bg-gray-100 cursor-not-allowed" : ""}`}
                        disabled={submitted}
                        minLength={config.minLength}
                        maxLength={config.maxLength}
                        pattern={config.regex !== "^.*$" ? config.regex : undefined}
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <FaInfoCircle
                            className="text-gray-400 cursor-help"
                            title={`Format: ${formatRegexForDisplay(config.regex)}\nLength: ${config.minLength}-${config.maxLength} chars\nType: ${config.inputType}`}
                        />
                    </div>
                </div>
                {error && (
                    <p className="text-red-500 text-sm">{error}</p>
                )}
                {/* <p className="text-xs text-gray-500">
                    Format: {config.inputType} • Length: {config.minLength}-{config.maxLength} chars
                    {config.regex && config.regex !== "^.*$" && (
                        <span> • Pattern: {formatRegexForDisplay(config.regex)}</span>
                    )}
                </p> */}
            </div>
        );
    };

    // Check if all mandatory fields are filled
    const areMandatoryFieldsFilled = () => {
        if (!billerInputConfig || Object.keys(billerInputConfig).length === 0) {
            return false;
        }

        return Object.keys(billerInputConfig).every(paramName => {
            const config = billerInputConfig[paramName];
            if (config.mandatory === 1) {
                const value = inputFields[paramName] || "";
                return value.trim().length >= config.minLength;
            }
            return true;
        });
    };

    return (
        <section className="py-5 px-4 md:px-0 max-w-6xl mx-auto">
            <ToastContainer position="top-center" />
            <div className="grid md:grid-cols-2">
                <div className="">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight pb">
                        Get your <br />
                        <span className="text-[#00186b] ">FASTag Bill </span>
                    </h2>
                    <Image
                        className="rounded-xl shadow-xl md:mt-8"
                        src="/image/billpay.jpg"
                        width={500}
                        height={600}
                        alt="FASTag bill payment"
                    />
                </div>
                <div className="mt-10 p-6 bg-white rounded-2xl shadow-md h-fit relative">
                    {loading ? (
                        <div className="flex justify-center items-center h-40">
                            <FaSpinner className="animate-spin text-4xl text-gray-600" />
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col justify-between gap-6">
                            {/* Provider Select */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Select Provider
                                </label>
                                <select
                                    value={provider}
                                    onChange={(e) => setProvider(e.target.value)}
                                    className={`w-full border rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${submitted ? "bg-gray-100 cursor-not-allowed" : "border-gray-300"
                                        }`}
                                    disabled={submitted}
                                    required
                                >
                                    <option value="">-- Choose Provider --</option>
                                    {providers.map((p) => (
                                        <option key={p.billerId} value={p.billerId}>
                                            {p.billerName}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Init Channel Select (if multiple available) */}
                            {initChannels.length > 1 && !submitted && (
                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">
                                        Initiation Channel
                                    </label>
                                    <select
                                        value={initChannel}
                                        onChange={(e) => setInitChannel(e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                    >
                                        {initChannels.map((channel) => (
                                            <option key={channel.name} value={channel.name}>
                                                {channel.desc} ({channel.commercialType})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            {/* DYNAMIC Input Fields - renders ANY parameters from ANY biller */}
                            {billerParams.length > 0 && (
                                <div className="space-y-4">
                                    {Object.keys(billerInputConfig).map(paramName =>
                                        renderInputField(paramName)
                                    )}
                                </div>
                            )}

                            {/* Provider Info - Dynamic */}
                            {/* {billerDetails && (
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                    <p className="text-sm text-blue-700">
                                        <span className="font-medium">Provider:</span> {billerDetails.billerInfo?.name || selectedBiller?.billerName}
                                        {billerDetails.paymentAmountExactness === "EXACT" && (
                                            <span className="ml-2 text-green-600">• Exact amount required</span>
                                        )}
                                        {billerDetails.paymentAmountExactness === "EXACT_UP" && (
                                            <span className="ml-2 text-amber-600">• Exact or higher amount accepted</span>
                                        )}
                                    </p>
                                    {billerDetails.fetchRequirement === "MANDATORY" && (
                                        <p className="text-xs text-blue-600 mt-1">
                                            Bill fetch is mandatory for this provider
                                        </p>
                                    )}
                                    <p className="text-xs text-gray-600 mt-1">
                                        Parameters: {billerParams.length} • Modes: {paymentModes.length} • Channels: {initChannels.length}
                                    </p>
                                </div>
                            )} */}

                            {/* Buttons */}
                            <div className="flex gap-3">
                                {!submitted ? (
                                    <button
                                        type="submit"
                                        className={`flex-1 py-3 rounded-lg font-medium transition flex justify-center items-center gap-2 ${!provider || fetchingBill || !areMandatoryFieldsFilled()
                                            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                                            : "bg-blue-600 text-white hover:bg-blue-700"
                                            }`}
                                        disabled={!provider || fetchingBill || !areMandatoryFieldsFilled()}
                                    >
                                        {fetchingBill ? (
                                            <>
                                                <FaSpinner className="animate-spin" />
                                                Fetching Bill...
                                            </>
                                        ) : (
                                            "Generate Bill"
                                        )}
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={handleReset}
                                        className="flex-1 py-3 rounded-lg font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
                                    >
                                        New Bill
                                    </button>
                                )}
                            </div>
                        </form>
                    )}

                    {/* Bill Details - Dynamic */}
                    {submitted && !showPaymentForm && (
                        <div className="bg-gray-50 p-5 rounded-xl shadow-inner mt-6 flex flex-col gap-4">
                            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                <FaMoneyBillWave /> Bill Details
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
                                <div>
                                    <p className="font-medium text-gray-500 text-sm">Provider</p>
                                    <p className="font-semibold">{selectedBiller?.billerName || provider}</p>
                                </div>
                                {Object.keys(inputFields).map(fieldName => {
                                    const config = billerInputConfig[fieldName];
                                    const value = inputFields[fieldName];
                                    if (!value || !config) return null;

                                    return (
                                        <div key={fieldName}>
                                            <p className="font-medium text-gray-500 text-sm">{config.desc}</p>
                                            <p className="font-semibold">{value}</p>
                                        </div>
                                    );
                                })}
                                <div>
                                    <p className="font-medium text-gray-500 text-sm">Customer Name</p>
                                    <p className="font-semibold">{customerName}</p>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-500 text-sm">Bill Number</p>
                                    <p className="font-semibold text-sm">{billNumber}</p>
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-lg border">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-medium text-gray-500 text-sm">Amount Due</p>
                                        <p className="text-2xl font-bold text-gray-800">₹{billAmount}</p>
                                    </div>
                                    <button
                                        onClick={handlePayBill}
                                        className="py-2 px-6 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition flex items-center gap-2"
                                    >
                                        <FaCreditCard />
                                        Pay Bill
                                    </button>
                                </div>
                            </div>
                            <div className="text-xs text-gray-500">
                                <p>Reference ID: <span className="font-mono">{enquiryReferenceId}</span></p>
                                <p>External Ref: <span className="font-mono">{externalRef}</span></p>
                            </div>
                        </div>
                    )}

                    {/* Payment Form Modal - Dynamic */}
                    {showPaymentForm && (
                        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
                            <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full relative">
                                <button
                                    onClick={() => setShowPaymentForm(false)}
                                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                                >
                                    <FaTimes />
                                </button>

                                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                    <FaCreditCard /> Complete Payment
                                </h3>

                                <form onSubmit={handlePaymentSubmit} className="space-y-4">
                                    {/* Dynamic Bill Summary */}
                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <h4 className="font-semibold text-gray-700 mb-2">Bill Summary</h4>
                                        <div className="space-y-1 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Provider:</span>
                                                <span className="font-medium">{selectedBiller?.billerName}</span>
                                            </div>
                                            {Object.keys(inputFields).map(fieldName => {
                                                const config = billerInputConfig[fieldName];
                                                const value = inputFields[fieldName];
                                                if (!value || !config) return null;

                                                return (
                                                    <div key={fieldName} className="flex justify-between">
                                                        <span className="text-gray-600">{config.desc}:</span>
                                                        <span className="font-medium">{value}</span>
                                                    </div>
                                                );
                                            })}
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Bill Amount:</span>
                                                <span className="font-bold">₹{billAmount}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Transaction Amount */}
                                    <div>
                                        <label className="block text-gray-700 font-medium mb-1">
                                            Transaction Amount *
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                                            <input
                                                type="number"
                                                value={transactionAmount}
                                                onChange={(e) => setTransactionAmount(e.target.value)}
                                                min={billerDetails?.paymentAmountExactness === "EXACT" ? billAmount : 1}
                                                step="0.01"
                                                placeholder="Enter amount"
                                                className="w-full border border-gray-300 rounded-lg p-2 pl-8 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                        {billerDetails?.paymentAmountExactness === "EXACT" && (
                                            <p className="text-sm text-amber-600 mt-1">
                                                Exact amount of ₹{billAmount} is required
                                            </p>
                                        )}
                                        {billerDetails?.paymentAmountExactness === "EXACT_UP" && parseFloat(transactionAmount) < parseFloat(billAmount) && (
                                            <p className="text-sm text-amber-600 mt-1">
                                                Amount is less than bill amount (₹{billAmount})
                                            </p>
                                        )}
                                    </div>

                                    {/* Dynamic Payment Mode Selection */}
                                    {/* <div>
                                        <label className="block text-gray-700 font-medium mb-1">
                                            Payment Mode *
                                        </label>
                                        <select
                                            value={paymentMode}
                                            onChange={(e) => setPaymentMode(e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        >
                                            {paymentModes.map((mode) => (
                                                <option key={mode.name} value={mode.name}>
                                                    {mode.desc} (₹{mode.minAmount} - ₹{mode.maxAmount})
                                                </option>
                                            ))}
                                        </select>
                                    </div> */}

                                    {/* Dynamic Payment Info Fields */}
                                    {paymentModes.map((mode) => {
                                        if (mode.name === paymentMode && mode.paymentInfo) {
                                            return mode.paymentInfo.map((info) => (
                                                <div key={info.name}>
                                                    <label className="block text-gray-700 font-medium mb-1">
                                                        {info.desc}
                                                        {info.required && <span className="text-red-500 ml-1">*</span>}
                                                    </label>
                                                    <input
                                                        type={getInputType(info.inputType)}
                                                        value={paymentInfo[info.name] || ""}
                                                        onChange={(e) => handlePaymentInfoChange(info.name, e.target.value)}
                                                        placeholder={`Enter ${info.desc.toLowerCase()}`}
                                                        minLength={info.minLength}
                                                        maxLength={info.maxLength}
                                                        pattern={info.regex && info.regex !== "^.*$" ? info.regex : undefined}
                                                        className="w-full border border-gray-300 rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    />
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        Length: {info.minLength}-{info.maxLength} chars
                                                        {info.regex && info.regex !== "^.*$" && (
                                                            <span> • Pattern: {formatRegexForDisplay(info.regex)}</span>
                                                        )}
                                                    </p>
                                                </div>
                                            ));
                                        }
                                        return null;
                                    })}

                                    {/* Payment Buttons */}
                                    <div className="flex gap-3 pt-4">
                                        <button
                                            type="button"
                                            onClick={() => setShowPaymentForm(false)}
                                            className="flex-1 py-3 rounded-lg font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={processingPayment}
                                            className="flex-1 py-3 rounded-lg font-medium bg-green-600 text-white hover:bg-green-700 transition flex justify-center items-center gap-2"
                                        >
                                            {processingPayment ? (
                                                <>
                                                    <FaSpinner className="animate-spin" />
                                                    Processing...
                                                </>
                                            ) : (
                                                <>
                                                    Pay ₹{transactionAmount || billAmount}
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* Payment Success Modal */}
                    {showModal && (
                        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
                            <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full relative">
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-40 h-40 mb-4">
                                        <iframe
                                            src="https://lottie.host/embed/3e9b3826-11ce-482c-95d4-a184bd6f3386/2qClaxPLhW.lottie"
                                            className="w-full h-full"
                                            title="Payment Successful"
                                        ></iframe>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">Payment Successful!</h3>
                                    <div className="space-y-2 mb-6">
                                        <p className="text-gray-700">
                                            <span className="font-medium">₹{transactionAmount || billAmount}</span> has been successfully paid
                                        </p>
                                        <div className="bg-green-50 p-3 rounded-lg">
                                            <div className="text-left space-y-1 text-sm">
                                                <p><span className="font-medium">Provider:</span> {selectedBiller?.billerName}</p>
                                                {Object.keys(inputFields).map(fieldName => {
                                                    const config = billerInputConfig[fieldName];
                                                    const value = inputFields[fieldName];
                                                    if (!value || !config) return null;

                                                    return (
                                                        <p key={fieldName}>
                                                            <span className="font-medium">{config.desc}:</span> {value}
                                                        </p>
                                                    );
                                                })}
                                                {/* <p><span className="font-medium">Mode:</span> {paymentMode}</p> */}
                                                {/* <p><span className="font-medium">Reference:</span> <span className="font-mono">{enquiryReferenceId?.substring(0, 8)}...</span></p> */}
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={closeModal}
                                        className="w-full py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                                    >
                                        Done
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}