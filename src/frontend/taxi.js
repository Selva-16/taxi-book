import React, { useState } from "react";
import axios from "axios";
import "./taxi.css";

function Taxi() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        pickup: "",
        destination: "",
        date: "",
        time: "",
        customPickup: "", // For custom pickup location
        customDestination: "", // For custom destination location
    });

    const [success, setSuccess] = useState(false);
    const [duplicateMessage, setDuplicateMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send booking request to the server
            const response = await axios.post("http://localhost:5000/bookings", formData);

            // Check if duplicate message is returned from the backend
            if (response.data.duplicate) {
                setDuplicateMessage("Duplicate entry detected. Booking has been recorded anyway.");
            } else {
                // Show success message
                setSuccess(true);

                // Reset form data after successful booking
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    pickup: "",
                    destination: "",
                    date: "",
                    time: "",
                    customPickup: "",
                    customDestination: "",
                });

                // Hide success message after 2 seconds
                setTimeout(() => {
                    setSuccess(false);
                }, 2000);
            }
        } catch (err) {
            console.error("Error submitting form", err);
            setDuplicateMessage("An error occurred. Please try again.");
            setTimeout(() => {
                setDuplicateMessage("");
            }, 2000);
        }
    };

    return (
        <div>
            {/* Navigation Bar */}
            <nav className="navbar">
                <h4>Taxi Booking Site</h4>
                <a href="#home">Home</a>
                <a href="#places">Popular Cities</a>
                <a href="#about">About Us</a>
                <a href="#book-taxi">Book a Taxi</a>
            </nav>

            {/* Home Section */}
            <section id="home">
                <h2>Ride With Us...</h2>
                <p>
                    Your trusted partner for safe, reliable, and affordable taxi services. Book your ride in just a few clicks and 
                    experience unmatched comfort with our professional drivers and well-maintained vehicles. Our services are designed 
                    to cater to all your transportation needs, whether it's a quick city commute or a long-distance journey. We prioritize 
                    your safety and convenience by providing 24/7 availability, real-time tracking, and transparent pricing. You can trust 
                    our skilled and courteous drivers to get you to your destination on time. With a fleet of well-maintained vehicles and 
                    a strong commitment to customer satisfaction, we ensure your ride is comfortable and hassle-free. Our intuitive booking 
                    platform makes it easy to plan your trip from anywhere, at any time. Choose us for your next ride and discover why 
                    thousands of happy customers rely on our services every day. Whether you're traveling for business, leisure, or errands, 
                    we're here to make your journey enjoyable and stress-free.
                </p>
            </section>

            {/* Popular Cities Section */}
            <div className="container">
                <section id="places" className="city">
                    <h2>Popular Cities</h2>
                    <div className="images">
                        <img src="images/chennai.jfif" alt="Chennai" />
                        <img src="images/coimbatore.jfif" alt="Coimbatore" />
                        <img src="images/kanyakumari.jfif" alt="Kanyakumari" />
                        <img src="images/yercaud.jfif" alt="Yercaud" />
                        <img src="images/kerala.jfif" alt="Kerala" />
                        <img src="images/tenkasi.jfif" alt="Tenkasi" />
                    </div>
                </section>
            </div>

            {/* About Us Section */}
            <section id="about">
                <h2>About Us</h2>
                <p>
                    At Taxi Booking Site, we pride ourselves on delivering top-notch travel experiences for our customers. Established 
                    in [Year], we have become a trusted name in the transportation industry. Whether you’re commuting within the city, 
                    heading out on a road trip, or visiting new destinations, our services are tailored to meet your needs. Our fleet of 
                    well-maintained vehicles and professional drivers ensures that each ride is safe, comfortable, and punctual. We strive 
                    to make your journey as smooth and enjoyable as possible, offering a range of services that cater to both individual 
                    and group travel. With transparent pricing, real-time booking updates, and 24/7 customer support, we are committed to 
                    providing a seamless experience from start to finish. Our aim is to be your preferred choice for all your travel needs, 
                    no matter where you go.
                </p>
            </section>

            {/* Book a Taxi Section */}
            <section id="book-taxi">
                <h2>Book a Taxi</h2>
                <div className="form-container">
                    <form id="taxiForm" onSubmit={handleSubmit}>
                        {/* Full Name Input */}
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-control"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />

                        {/* Email Address Input */}
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            placeholder="Enter your email address"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        {/* Phone Number Input */}
                        <label htmlFor="phone">Phone Number</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            className="form-control"
                            placeholder="Enter your phone number"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            pattern="[0-9]{10}"
                        />

                        {/* Pickup Location Dropdown */}
                        <label htmlFor="pickup">Pickup Location</label>
                        <select
                            id="pickup"
                            name="pickup"
                            className="form-control"
                            value={formData.pickup}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Pickup Location</option>
                            <option value="Chennai">Chennai</option>
                            <option value="Coimbatore">Coimbatore</option>
                            <option value="Kanyakumari">Kanyakumari</option>
                            <option value="Yercaud">Yercaud</option>
                            <option value="Kerala">Kerala</option>
                            <option value="Tenkasi">Tenkasi</option>
                            <option value="Other">Other</option>
                        </select>

                        {/* Custom Pickup Location (If "Other" is selected) */}
                        {formData.pickup === "Other" && (
                            <input
                                type="text"
                                id="customPickup"
                                name="customPickup"
                                className="form-control"
                                placeholder="Enter your custom pickup location"
                                value={formData.customPickup}
                                onChange={handleChange}
                                required
                            />
                        )}

                        {/* Destination Location Dropdown */}
                        <label htmlFor="destination">Destination</label>
                        <select
                            id="destination"
                            name="destination"
                            className="form-control"
                            value={formData.destination}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Destination</option>
                            <option value="Chennai">Chennai</option>
                            <option value="Coimbatore">Coimbatore</option>
                            <option value="Kanyakumari">Kanyakumari</option>
                            <option value="Yercaud">Yercaud</option>
                            <option value="Kerala">Kerala</option>
                            <option value="Tenkasi">Tenkasi</option>
                            <option value="Other">Other</option>
                        </select>

                        {/* Custom Destination Location (If "Other" is selected) */}
                        {formData.destination === "Other" && (
                            <input
                                type="text"
                                id="customDestination"
                                name="customDestination"
                                className="form-control"
                                placeholder="Enter your custom destination location"
                                value={formData.customDestination}
                                onChange={handleChange}
                                required
                            />
                        )}

                        {/* Pickup Date Input */}
                        <label htmlFor="date">Pickup Date</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            className="form-control"
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />

                        {/* Pickup Time Input */}
                        <label htmlFor="time">Pickup Time</label>
                        <input
                            type="time"
                            id="time"
                            name="time"
                            className="form-control"
                            value={formData.time}
                            onChange={handleChange}
                            required
                        />

                        {/* Submit Button */}
                        <button type="submit" className="btn btn-primary w-100">
                            Book Taxi
                        </button>
                    </form>
                </div>
            </section>

            {/* Success Popup */}
            {success && (
                <div className="success-popup">
                    <img src="images/tick.png" alt="Success" className="success-icon" />
                    <p>Booking Successful!</p>
                </div>
            )}

            {/* Duplicate Error Message */}
            {duplicateMessage && (
                <div className="error-popup">
                    <img src="images/error-icon.png" alt="Error" className="error-icon" />
                    <p>{duplicateMessage}</p>
                </div>
            )}
        </div>
    );
}

export default Taxi;
