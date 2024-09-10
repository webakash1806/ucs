import React from 'react';

const TermsAndConditions = () => {
    return (
        <div className=" min-h-screen px-[4vw] sm:px-[7vw] md:px-[8vw] lg:px-[9vw] w-full py-10 bg-gray-50">

            <h1 className="mb-8 text-3xl font-semibold text-center">Terms and Conditions</h1>

            <p className="mb-4 text-gray-700">
                **Effective Date**: [Insert Effective Date]
            </p>

            <p className="mb-4 text-gray-700">
                Welcome to UCS, a cab booking platform. By accessing or using our website, mobile application, or services, you agree to comply with and be bound by the following Terms and Conditions. Please read these terms carefully, as they govern your use of our platform. If you do not agree with these terms, you may not access or use our services.
            </p>

            {/* General Terms */}
            <h2 className="mb-4 text-[1.3rem] font-semibold text-gray-800">1. General Terms</h2>
            <p className="mb-4 text-gray-700">
                UCS operates a cab booking platform that connects users with drivers for transportation services. By using the platform, you acknowledge and agree that UCS acts as an intermediary between users and drivers, and we do not provide transportation services ourselves. The following terms apply to all users of the platform, including passengers and drivers.
            </p>

            {/* Account Registration */}
            <h2 className="mb-4 text-[1.3rem] font-semibold text-gray-800">2. Account Registration</h2>
            <p className="mb-4 text-gray-700">
                To use certain features of the UCS platform, you must create an account and provide accurate and up-to-date personal information. You are responsible for maintaining the confidentiality of your account details, including your username and password. You agree to notify UCS immediately if you suspect unauthorized access or misuse of your account. UCS is not liable for any losses or damages resulting from unauthorized use of your account.
            </p>

            {/* User Responsibilities */}
            <h2 className="mb-4 text-[1.3rem] font-semibold text-gray-800">3. User Responsibilities</h2>
            <p className="mb-4 text-gray-700">
                When using the UCS platform, you agree to:
            </p>
            <ul className="mb-4 text-gray-700 list-disc list-inside">
                <li>Provide accurate, current, and complete information during the registration process and when using our services.</li>
                <li>Use the platform only for lawful purposes and not for any illegal or unauthorized activity.</li>
                <li>Respect and comply with all applicable traffic laws, regulations, and driver requirements while using our services.</li>
                <li>Refrain from using abusive, offensive, or harmful language or behavior toward drivers, passengers, or UCS staff.</li>
                <li>Not engage in any activity that interferes with or disrupts the platform or the services provided by UCS or its drivers.</li>
                <li>Pay for all services used through the UCS platform, including ride fares, cancellation fees, and any applicable taxes.</li>
            </ul>

            {/* Booking and Cancellation */}
            <h2 className="mb-4 text-[1.3rem] font-semibold text-gray-800">4. Booking and Cancellation Policy</h2>
            <p className="mb-4 text-gray-700">
                By booking a ride through UCS, you agree to the following terms:
            </p>
            <ul className="mb-4 text-gray-700 list-disc list-inside">
                <li>Booking a ride is a binding agreement between you and the driver. Once the driver accepts the ride, you are obligated to honor the booking unless you cancel in accordance with our cancellation policy.</li>
                <li>Cancellation fees may apply if you cancel a booking after a certain time frame or under certain conditions as specified in the app or website.</li>
                <li>UCS reserves the right to cancel your ride in case of emergencies, safety concerns, or other factors beyond our control.</li>
            </ul>

            {/* Payment Terms */}
            <h2 className="mb-4 text-[1.3rem] font-semibold text-gray-800">5. Payment Terms</h2>
            <p className="mb-4 text-gray-700">
                All payments for rides and services booked through UCS are processed via our payment partners. You agree to:
            </p>
            <ul className="mb-4 text-gray-700 list-disc list-inside">
                <li>Pay the ride fare, applicable taxes, and any additional fees (e.g., waiting charges, cancellation fees) as displayed during the booking process.</li>
                <li>Authorize UCS to charge your provided payment method for the total ride cost.</li>
                <li>Ensure that your payment information is accurate and up to date. UCS is not responsible for any failed transactions due to insufficient funds or incorrect payment details.</li>
                <li>Any disputes regarding payments must be raised within 30 days of the transaction.</li>
            </ul>

            {/* Driver Responsibilities */}
            <h2 className="mb-4 text-[1.3rem] font-semibold text-gray-800">6. Driver Responsibilities</h2>
            <p className="mb-4 text-gray-700">
                If you are a driver using UCS, you agree to:
            </p>
            <ul className="mb-4 text-gray-700 list-disc list-inside">
                <li>Provide accurate information about your vehicle, license, and insurance status.</li>
                <li>Comply with all local traffic laws and regulations while providing transportation services.</li>
                <li>Ensure the safety and comfort of passengers during the ride.</li>
                <li>Maintain your vehicle in good working condition and ensure it meets all safety standards.</li>
                <li>Respond to ride requests in a timely and professional manner.</li>
            </ul>

            {/* Limitation of Liability */}
            <h2 className="mb-4 text-[1.3rem] font-semibold text-gray-800">7. Limitation of Liability</h2>
            <p className="mb-4 text-gray-700">
                UCS provides a platform for connecting passengers and drivers, but we do not guarantee the quality, safety, or reliability of the transportation services provided. You agree that UCS is not responsible for:
            </p>
            <ul className="mb-4 text-gray-700 list-disc list-inside">
                <li>Any accidents, injuries, or damages that occur during the ride.</li>
                <li>Delays, cancellations, or missed connections due to traffic, weather, or other unforeseen circumstances.</li>
                <li>Any unauthorized access to your account or personal information caused by external factors beyond our control.</li>
                <li>Actions or conduct of the drivers, passengers, or third-party service providers.</li>
            </ul>

            {/* User-Generated Content */}
            <h2 className="mb-4 text-[1.3rem] font-semibold text-gray-800">8. User-Generated Content</h2>
            <p className="mb-4 text-gray-700">
                If you post reviews, feedback, or other content on the UCS platform, you grant UCS a non-exclusive, worldwide, royalty-free license to use, display, and distribute your content for promotional purposes. You are responsible for ensuring that your content does not violate any laws or infringe on the rights of third parties.
            </p>

            {/* Intellectual Property */}
            <h2 className="mb-4 text-[1.3rem] font-semibold text-gray-800">9. Intellectual Property</h2>
            <p className="mb-4 text-gray-700">
                All content, trademarks, logos, and intellectual property used on the UCS platform are the property of UCS or its licensors. You may not use, copy, or distribute any content from our platform without prior written consent from UCS.
            </p>

            {/* Termination */}
            <h2 className="mb-4 text-[1.3rem] font-semibold text-gray-800">10. Termination</h2>
            <p className="mb-4 text-gray-700">
                UCS reserves the right to suspend or terminate your account if you violate these Terms and Conditions, engage in illegal activities, or misuse the platform. Upon termination, you must cease all use of the platform, and any outstanding payments or obligations will remain due.
            </p>

            {/* Changes to Terms */}
            <h2 className="mb-4 text-[1.3rem] font-semibold text-gray-800">11. Changes to Terms</h2>
            <p className="mb-4 text-gray-700">
                UCS reserves the right to update these Terms and Conditions from time to time. We will notify you of any material changes by posting the updated terms on our platform, and the new terms will take effect immediately upon posting. Your continued use of the platform after any changes signifies your acceptance of the updated terms.
            </p>

            {/* Governing Law */}
            <h2 className="mb-4 text-[1.3rem] font-semibold text-gray-800">12. Governing Law</h2>
            <p className="mb-4 text-gray-700">
                These Terms and Conditions are governed by and construed in accordance with the laws of [Insert Jurisdiction]. Any disputes arising out of or related to these terms shall be subject to the exclusive jurisdiction of the courts in [Insert Jurisdiction].
            </p>

            {/* Contact Information */}
            <h2 className="mb-4 text-[1.3rem] font-semibold text-gray-800">13. Contact Information</h2>
            <p className="mb-4 text-gray-700">
                If you have any questions or concerns regarding these Terms and Conditions, please contact us at:
            </p>
            <ul className="mb-4 text-gray-700 list-none">
                <li><strong>Email:</strong> [Insert Company Email]</li>
                <li><strong>Phone:</strong> [Insert Phone Number]</li>
                <li><strong>Address:</strong> [Insert Company Address]</li>
            </ul>
        </div>
    );
};

export default TermsAndConditions;
