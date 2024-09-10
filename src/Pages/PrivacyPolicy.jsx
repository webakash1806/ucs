import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className=" min-h-screen px-[4vw] sm:px-[7vw] md:px-[8vw] lg:px-[9vw] w-full py-10 bg-gray-50">

            <h1 className="mb-8 text-3xl font-semibold text-center">Privacy Policy</h1>

            <p className="mb-4 text-gray-700">
                **Effective Date**: [Insert Effective Date]
            </p>

            <p className="mb-4 text-gray-700">
                At UCS, your privacy is our priority. We are committed to safeguarding your personal information in relation to our cab booking platform. This Privacy Policy outlines how UCS collects, uses, shares, and protects the data you provide when using our website, mobile application, or any of our services. By accessing or using our platform, you agree to the practices described in this policy. Please read this policy carefully to understand how your personal information is handled.
            </p>

            {/* Information We Collect */}
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">1. Information We Collect</h2>

            <p className="mb-4 text-gray-700">
                UCS collects information to provide and improve our services, facilitate bookings, and ensure a seamless customer experience. The information collected may include both personal and non-personal data.
            </p>

            <h3 className="mb-2 text-xl font-semibold text-gray-800">1.1 Personal Information</h3>
            <p className="mb-4 text-gray-700">
                We collect personal information directly from you when you use our services, create an account, or interact with our platform. This includes, but is not limited to:
            </p>
            <ul className="mb-4 text-gray-700 list-disc list-inside">
                <li>Your full name</li>
                <li>Contact information, including email address and phone number</li>
                <li>Pickup and drop-off location details</li>
                <li>Payment information (credit card details, billing address, etc.)</li>
                <li>Vehicle preferences, special requests, or additional notes you provide</li>
                <li>Profile and account details (including username and password)</li>
            </ul>

            <h3 className="mb-2 text-xl font-semibold text-gray-800">1.2 Automatically Collected Data</h3>
            <p className="mb-4 text-gray-700">
                When you use our platform, we may automatically collect information through cookies and other tracking technologies. This includes:
            </p>
            <ul className="mb-4 text-gray-700 list-disc list-inside">
                <li>Your IP address and browser type</li>
                <li>Device information (device type, operating system)</li>
                <li>Geolocation data, such as your current location or destination (with your permission)</li>
                <li>Usage data (pages visited, actions taken, time spent on the platform)</li>
                <li>Mobile device identifiers (if using our mobile app)</li>
            </ul>

            {/* How We Use Your Information */}
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">2. How We Use Your Information</h2>

            <p className="mb-4 text-gray-700">
                The personal and non-personal information we collect is used to deliver, improve, and optimize our cab booking services, as well as to communicate with you effectively. Specifically, UCS uses your information to:
            </p>

            <ul className="mb-4 text-gray-700 list-disc list-inside">
                <li>Facilitate and process your cab bookings and ride requests</li>
                <li>Send you booking confirmations, ride details, and payment receipts</li>
                <li>Provide customer support and handle inquiries or complaints</li>
                <li>Enhance your user experience by personalizing the platform based on your preferences</li>
                <li>Improve our services by analyzing usage trends, feedback, and customer satisfaction</li>
                <li>Communicate promotions, updates, and special offers relevant to your interests (you may opt-out of these communications)</li>
                <li>Ensure the safety and security of both passengers and drivers by tracking trips and monitoring behavior</li>
            </ul>

            {/* Sharing Your Information */}
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">3. Sharing Your Information</h2>

            <p className="mb-4 text-gray-700">
                UCS values your privacy and does not sell your personal information. However, we may share your information with third parties under specific circumstances to facilitate our services, ensure compliance, and protect our rights.
            </p>

            <ul className="mb-4 text-gray-700 list-disc list-inside">
                <li>
                    <strong>Drivers and Partners:</strong> We share your booking details (e.g., name, pickup and drop-off locations) with drivers or service partners to fulfill your ride requests.
                </li>
                <li>
                    <strong>Service Providers:</strong> We work with third-party vendors who assist us in operating the platform (e.g., payment processors, customer support, analytics services). These vendors are bound by confidentiality agreements and only use your information as necessary to provide services on our behalf.
                </li>
                <li>
                    <strong>Legal Requirements:</strong> We may disclose your information if required to do so by law, regulation, or in response to legal processes, such as court orders or subpoenas.
                </li>
                <li>
                    <strong>Business Transfers:</strong> If UCS undergoes a merger, acquisition, or asset sale, your information may be transferred as part of the transaction.
                </li>
            </ul>

            {/* Data Security */}
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">4. Data Security</h2>

            <p className="mb-4 text-gray-700">
                We implement a variety of security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. These include encryption of payment information, secure server infrastructure, and access control mechanisms. Despite our best efforts, no system can be completely secure, and we cannot guarantee the absolute safety of your data.
            </p>

            {/* Data Retention */}
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">5. Data Retention</h2>

            <p className="mb-4 text-gray-700">
                UCS retains your personal information for as long as it is necessary to provide services, meet legal obligations, resolve disputes, or enforce our agreements. This includes keeping transaction history and ride details for accounting or legal purposes. If you request account deletion, certain data may still be retained in anonymized or aggregated form.
            </p>

            {/* Location Data */}
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">6. Location Data</h2>

            <p className="mb-4 text-gray-700">
                In order to provide an optimal cab booking experience, we may request access to your location data to accurately match you with nearby drivers. You may opt-out of location sharing through your device settings, but doing so may limit the functionality of our services.
            </p>

            {/* Cookies and Tracking Technologies */}
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">7. Cookies and Tracking Technologies</h2>

            <p className="mb-4 text-gray-700">
                UCS uses cookies and other tracking technologies to enhance user experience, analyze website usage, and deliver targeted advertisements. Cookies are small text files stored on your device to remember your preferences. You can manage or disable cookies through your browser settings, but note that some features of our platform may not function properly without cookies.
            </p>

            {/* Your Rights and Choices */}
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">8. Your Rights and Choices</h2>

            <p className="mb-4 text-gray-700">
                You have the right to:
            </p>

            <ul className="mb-4 text-gray-700 list-disc list-inside">
                <li>Access and review the personal information we hold about you</li>
                <li>Request corrections to your personal data if inaccurate or incomplete</li>
                <li>Request deletion of your personal information, subject to legal requirements</li>
                <li>Opt-out of receiving promotional communications at any time</li>
                <li>Restrict certain processing of your data, particularly for marketing purposes</li>
            </ul>

            {/* Children's Privacy */}
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">9. Children's Privacy</h2>

            <p className="mb-4 text-gray-700">
                UCS services are intended for individuals over the age of 18. We do not knowingly collect personal information from minors. If we learn that a child under 18 has provided us with personal information, we will take steps to delete such data promptly.
            </p>

            {/* Updates to this Privacy Policy */}
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">10. Changes to this Privacy Policy</h2>

            <p className="mb-4 text-gray-700">
                UCS reserves the right to update this Privacy Policy from time to time to reflect changes in our services or legal obligations. We will notify you of any material changes by posting the updated policy on our platform, and the new policy will take effect as soon as it is posted.
            </p>

            <p className="mb-4 text-gray-700">
                If you have any questions or concerns about this Privacy Policy, please contact us at:
            </p>

            <ul className="mb-4 text-gray-700 list-none">
                <li><strong>Email:</strong> [Insert Company Email]</li>
                <li><strong>Address:</strong> [Insert Company Address]</li>
                <li><strong>Phone:</strong> [Insert Phone Number]</li>
            </ul>
        </div>
    );
};

export default PrivacyPolicy;
