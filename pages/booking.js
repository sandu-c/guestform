import { useState } from "react";
import Head from "next/head";

export default function Booking() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        checkin: "",
        checkout: "",
        guests: 1,
        message: "",
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        console.log("Booking Request Submitted:", formData);
        alert("Your booking request has been submitted. We will contact you soon!");
    };

    return (
        <>
            <Head>
                <title>Book Your Stay</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>

            <main className="booking-page">
                <h1>Secure Your Stay & Get Up to 10% Off</h1>
                <p>Book directly with us and enjoy lower prices compared to Booking.com.</p>

                <form onSubmit={handleSubmit} className="booking-form">
                    <label>Name*</label>
                    <input type="text" name="name" required onChange={handleChange} />

                    <label>Email*</label>
                    <input type="email" name="email" required onChange={handleChange} />

                    <label>Phone Number*</label>
                    <input type="tel" name="phone" required onChange={handleChange} />

                    <label>Check-in Date*</label>
                    <input type="date" name="checkin" required onChange={handleChange} />

                    <label>Check-out Date*</label>
                    <input type="date" name="checkout" required onChange={handleChange} />

                    <label>Number of Guests*</label>
                    <select name="guests" required onChange={handleChange}>
                        {[...Array(10).keys()].map((num) => (
                            <option key={num + 1} value={num + 1}>
                                {num + 1}
                            </option>
                        ))}
                    </select>

                    <label>Special Requests</label>
                    <textarea name="message" rows="3" onChange={handleChange}></textarea>

                    <button type="submit">Submit Booking Request</button>

                    {submitted && <p className="success-message">Thank you! We will contact you soon.</p>}
                </form>
            </main>

            <style jsx>{`
        .booking-page {
          text-align: center;
          padding: 40px;
          background: #fff;
        }

        .booking-form {
          display: flex;
          flex-direction: column;
          max-width: 500px;
          margin: 0 auto;
        }

        .booking-form label {
          margin-top: 10px;
          font-weight: bold;
        }

        .booking-form input,
        .booking-form select,
        .booking-form textarea {
          padding: 10px;
          margin: 5px 0;
          width: 100%;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        .booking-form button {
          margin-top: 15px;
          padding: 12px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 1rem;
        }

        .booking-form button:hover {
          background-color: #0056b3;
        }

        .success-message {
          color: green;
          margin-top: 10px;
          font-weight: bold;
        }
      `}</style>
        </>
    );
}
