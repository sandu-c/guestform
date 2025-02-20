import Head from "next/head";
import Image from "next/image";
import React, {useEffect, useState} from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css"; // Import Flatpickr styles
import ICAL from "ical.js";

export default function Home() {

    const [dateRange, setDateRange] = useState([null, null]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [disabledDates, setDisabledDates] = useState([]); // Stores unavailable dates

    // const icsUrl = "https://your-calendar-url.ics"; // Replace with your .ics file URL
    const icsUrl = "/export.ics"; // Replace with your .ics file URL

    useEffect(() => {
        fetch(icsUrl)
            .then(response => response.text())
            .then(data => {
                const jcalData = ICAL.parse(data);
                const comp = new ICAL.Component(jcalData);
                const events = comp.getAllSubcomponents("vevent");

                const unavailableDates = events.map(event => {
                    const vevent = new ICAL.Event(event);
                    return {from: vevent.startDate.toJSDate(), to: vevent.endDate.toJSDate()}; // Convert to JavaScript Date object
                });

                setDisabledDates(unavailableDates);
            })
            .catch(error => console.error("Error fetching .ics:", error));
    }, []);

    // Translation dictionary
    const translations = {
        en: {
            title: "Your Dream Getaway",
            heroTitle: "Your Perfect Escape",
            stars: "⭐⭐⭐⭐⭐",
            discount: "📢 Get up to 10% OFF when you book directly with us!",
            discountBox: "Experience comfort and tranquility in our stunning studio.",
            bookNow: "Book Now",
            learnMore: "Learn More",
            about: "About Our Studio",
            intro: "Your Dream Stay in Benalmádena",
            description: "Welcome to Premium Studio Minerva 103, a newly renovated retreat designed for your relaxation.",
            features: [
                "🌅 Breathtaking Sea Views – Enjoy morning coffee or sunset drinks from your private balcony.",
                "🏊‍♂️ Exclusive Pool Complex – Multiple outdoor pools, a water park, and sun loungers for the perfect holiday vibe.",
                "🍽️ Fully Equipped Kitchen – Everything you need, including a microwave, toaster, and washing machine.",
                "❄️ Comfort – Air conditioning & heating, high-speed Wi-Fi, and a modern, stylish interior.",
                "📍 Prime Location – Minutes from the beach, restaurants, and Puerto Marina. Easy access to Málaga Airport (12km)."
            ],
            highlight: "💡 Rated 9.1 by couples – Ideal for a romantic escape or a relaxing getaway.",
            formTitle: "Secure Your Stay & Get Up to 10% Off *",
            formDescription: "Book directly with us and enjoy lower prices compared to ",
            formFields: {
                name: "Name*",
                email: "Email*",
                phone: "Phone / WhatsApp (Optional)",
                checkin: "Check-in Date*",
                checkout: "Check-out Date*",
                guests: "Number of Guests*",
                message: "Special Requests",
                submit: "Submit Booking Request"
            },
            discountNote: "* 5% off for less than 7 nights, 10% off for more than 7 nights",
            successMessage: "Thank you! We will contact you soon.",
            alertMessage: "Your booking request has been submitted. We will contact you soon!",
            languageToggle: "Español",
            thanksMessage: "Thank you! Your submission has been received. We will contact you soon"
        },
        es: {
            title: "Tu Escapada de Ensueño",
            heroTitle: "Tu Escapada Perfecta",
            stars: "⭐⭐⭐⭐⭐",
            discount: "📢 ¡Obtén hasta un 10% de DESCUENTO reservando directamente con nosotros!",
            discountBox: "Experiencia comodidad y tranquilidad en nuestro estudio impresionante.",
            bookNow: "Reservar Ahora",
            learnMore: "Más Información",
            about: "Sobre Nuestro Estudio",
            intro: "Tu Estancia de Ensueño en Benalmádena",
            description: "Bienvenido a Premium Studio Minerva 103, un refugio recién renovado diseñado para tu relajación.",
            features: [
                "🌅 Vistas Impresionantes al Mar – Disfruta de tu café matutino o una copa al atardecer desde tu balcón privado.",
                "🏊‍♂️ Complejo de Piscinas Exclusivo – Varias piscinas al aire libre, un parque acuático y tumbonas para un ambiente vacacional perfecto.",
                "🍽️ Cocina Totalmente Equipada – Todo lo que necesitas, incluyendo microondas, tostadora y lavadora.",
                "❄️ Comodidad – Aire acondicionado y calefacción, Wi-Fi de alta velocidad e interior moderno y elegante.",
                "📍 Ubicación Privilegiada – A minutos de la playa, restaurantes y Puerto Marina. Fácil acceso al aeropuerto de Málaga (12km)."
            ],
            highlight: "💡 Calificación 9.1 por parejas – Ideal para una escapada romántica o un retiro relajante.",
            formTitle: "Asegura tu Estancia & Obtén hasta un 10% de Descuento *",
            formDescription: "Reserva directamente con nosotros y disfruta de precios más bajos que en ",
            formFields: {
                name: "Nombre*",
                email: "Correo Electrónico*",
                phone: "Teléfono / WhatsApp (Opcional)",
                checkin: "Fecha de Entrada*",
                checkout: "Fecha de Salida*",
                guests: "Número de Huéspedes*",
                message: "Peticiones Especiales",
                submit: "Enviar Solicitud de Reserva"
            },
            discountNote: "* 5% de descuento por menos de 7 noches, 10% por más de 7 noches",
            successMessage: "¡Gracias! Nos pondremos en contacto contigo pronto.",
            alertMessage: "Tu solicitud de reserva ha sido enviada. ¡Nos pondremos en contacto contigo pronto!",
            languageToggle: "English",
            thanksMessage: "¡Gracias por tu reserva! Nos pondremos en contacto contigo pronto."
        }
    };

    const [language, setLanguage] = useState("en"); // Language state (English default)

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
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     setSubmitted(true);
    //     console.log("Booking Request Submitted:", formData);
    //     alert("Your booking request has been submitted. We will contact you soon!");
    // };


    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        console.log("Booking Request Submitted:", formData);
        alert(translations[language].alertMessage);
    };


    return (
        <>
            <Head>
                <title>Your Dream Getaway</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <link
                    href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@400;700&display=swap"
                    rel="stylesheet"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap"
                    rel="stylesheet"
                />
            </Head>


            <main>
                {/* Language Toggle Button */}
                {/*<button className="language-toggle" onClick={() => setLanguage(language === "en" ? "es" : "en")}>*/}
                {/*    {translations[language].languageToggle}*/}
                {/*</button>*/}

                {/*<button className="language-toggle" onClick={() => setLanguage(language === "en" ? "es" : "en")}>*/}
                {/*    <h2>{language === "en" ? "🇪🇸 Español" : "🇬🇧 English"}</h2>*/}
                {/*</button>*/}

                {/*<button className="language-toggle" onClick={() => setLanguage(language === "en" ? "es" : "en")}>*/}
                {/*    <span className="flag">{language === "en" ? "🇪🇸" : "🇬🇧"}</span>*/}
                {/*    <span className="text">{language === "en" ? "Español" : "English"}</span>*/}
                {/*</button>*/}

                {/*<button className="language-toggle" onClick={() => setLanguage(language === "en" ? "es" : "en")}>*/}
                {/*    <span className="flag">{language === "en" ? "🇪🇸" : "🇬🇧"}</span>*/}
                {/*</button>*/}

                <button
                    className="language-toggle"
                    onClick={() => setLanguage(language === "en" ? "es" : "en")}
                    data-tooltip={language === "en" ? "Cambia a Español" : "Switch to English"}
                >
                    <span className="flag">{language === "en" ? "🇪🇸" : "🇬🇧"}</span>
                </button>


                {/* Hero Section */}
                <section className="hero">
                    <div className="glass-overlay"></div>
                    <Image
                        className="hero-image"
                        // src="https://www.decorilla.com/online-decorating/wp-content/uploads/2020/01/studio-apartment-layout-ideas-nyc-decorilla.jpg"
                        src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/403651919.jpg?k=7ec0e408f51ee4fb53711c64d5727ba6be0ae6996aba400b92f3931a0a2b49fd&o=&hp=1"
                        alt="Beautiful Studio/Apartment"
                        layout="fill"
                        objectFit="cover"
                        priority
                    />
                    <div className="hero-content">
                        <h1 className="hero-title">{translations[language].heroTitle}</h1>
                        <h2>⭐⭐⭐⭐⭐</h2>

                        {/* Discount Offer */}
                        <div className="hero-subtitle">
                            <p>{translations[language].discount}</p>
                        </div>

                        <a href="#submit-info" className="cta-button hero-subtitle">
                            {translations[language].bookNow}
                        </a>

                        <p className="discount-box">
                            {translations[language].discountBox}
                        </p>
                        <a href="#details" className="cta-button">
                            {translations[language].learnMore}
                        </a>{" "}

                    </div>
                </section>

                {/* Details Section */}
                <section id="details" className="details">
                    <h2>{translations[language].about}</h2>

                    <p className="intro">{translations[language].intro}</p>

                    <p>{translations[language].description}</p>

                    <h3>Why Choose This Stay?</h3>

                    {/*<ul className="features">*/}
                    {/*    <li><strong>🌅 Breathtaking Sea Views</strong> – Enjoy morning coffee or sunset drinks from your*/}
                    {/*        private balcony.*/}
                    {/*    </li>*/}
                    {/*    <li><strong>🏊‍♂️ Exclusive Pool Complex</strong> – Multiple outdoor pools, a <strong>water*/}
                    {/*        park</strong>, and sun loungers for the perfect holiday vibe.*/}
                    {/*    </li>*/}
                    {/*    <li><strong>🍽️ Fully Equipped Kitchen</strong> – Everything you need, including a <strong>microwave,*/}
                    {/*        toaster, and washing machine</strong>.*/}
                    {/*    </li>*/}
                    {/*    <li><strong>❄️ Comfort</strong> – <strong>Air conditioning & heating</strong>,*/}
                    {/*        high-speed <strong>Wi-Fi</strong>, and a <strong>modern, stylish interior</strong>.*/}
                    {/*    </li>*/}
                    {/*    <li><strong>📍 Prime Location</strong> – <strong>Minutes from the beach, restaurants, and Puerto*/}
                    {/*        Marina</strong>. Easy access to Málaga Airport (12km).*/}
                    {/*    </li>*/}
                    {/*</ul>*/}

                    <ul className="features">
                        {translations[language].features.map((feature, index) => (
                            <p key={index}>{feature}</p>
                        ))}
                    </ul>


                    <p className="highlight">💡 {translations[language].highlight}</p>
                    <br/>

                    <a href="#submit-info" className="cta-button">
                        {translations[language].bookNow}
                    </a>
                </section>

                <section id="submit-info" className="submit-info">
                    <h1>{translations[language].formTitle}</h1>
                    <p>{translations[language].formDescription} <a
                        href="https://www.booking.com/hotel/es/nuevo-premium-studio-con-piscina-minerva-jupiter.en-gb.html"
                        target="_blank">Booking.com</a>
                    </p>


                    {/*<Link*/}
                    {/*    href="https://www.booking.com/hotel/es/nuevo-premium-studio-con-piscina-minerva-jupiter.en-gb.html">*/}
                    {/*    Booking.com.*/}
                    {/*</Link>*/}

                    <form action="https://api.staticforms.xyz/submit" method="post" target="hidden_iframe"
                          className="booking-form" onSubmit={() => setShowConfirmation(true)}>
                        {/* Name Field */}
                        <label>{translations[language].formFields.name}</label>
                        <input type="text" name="name" required placeholder={translations[language].formFields.name}/>

                        {/* Email Field */}
                        <label>{translations[language].formFields.email}</label>
                        <input type="email" name="email" required
                               placeholder={translations[language].formFields.email}/>

                        {/* Phone Field */}
                        <label>{translations[language].formFields.phone}</label>
                        <input type="tel" name="phone" placeholder={translations[language].formFields.phone}/>

                        {/* Date Range Picker (Check-in & Check-out) */}
                        <label htmlFor="dateRange">
                            {translations[language].formFields.checkin} - {translations[language].formFields.checkout} *
                        </label>
                        <Flatpickr
                            id="dateRange"
                            name="dateRange"
                            value={dateRange}
                            onChange={(selectedDates) => setDateRange(selectedDates)}
                            options={{
                                mode: "range",
                                dateFormat: "d-m-Y",
                                minDate: new Date().fp_incr(1),
                                disable: disabledDates,
                                disableMobile: "true",
                            }}
                            className="date-picker"
                        />

                        {/* Hidden fields for StaticForms submission */}
                        <input type="hidden" name="$checkin"
                               value={dateRange[0] ? dateRange[0].toISOString().split("T")[0] : ""}/>
                        <input type="hidden" name="$checkout"
                               value={dateRange[1] ? dateRange[1].toISOString().split("T")[0] : ""}/>

                        {/* Number of Guests */}
                        <label>{translations[language].formFields.guests}</label>
                        <select name="guests" required>
                            {[...Array(4).keys()].map((num) => (
                                <option key={num + 1} value={num + 1}>
                                    {num + 1}
                                </option>
                            ))}
                        </select>

                        {/* Special Requests */}
                        <label>{translations[language].formFields.message}</label>
                        <textarea name="message" rows="3"
                                  placeholder={translations[language].formFields.message}></textarea>

                        {/* Honeypot Field (Spam Prevention) */}
                        <input type="text" name="honeypot" style={{display: "none"}}/>

                        {/* StaticForms Required Hidden Fields */}
                        <input type="hidden" name="accessKey" value="1a5563e6-caa7-4e3a-bf5e-9bfe56ff94ab"/>
                        <input type="hidden" name="subject"
                               value="New Booking Request from Premium Studio Minerva 103"/>
                        <input type="hidden" name="replyTo" value="@"/>
                        <input type="hidden" name="redirectTo" value="/submit-info"/>

                        {/* Submit Button */}
                        <button type="submit">{translations[language].formFields.submit}</button>

                        <p>{translations[language].discountNote}</p>
                    </form>

                    {/*<iframe name="hidden_iframe" style={{display: "none"}}></iframe>*/}
                    {/*<div id="confirmation" style={{display: "none", color: "green", fontWeight: "bold"}}>*/}
                    {/*    ✅ Thank you! Your submission has been received.*/}
                    {/*</div>*/}

                    {/* Hidden Iframe to Catch Response */}
                    <iframe name="hidden_iframe" style={{display: "none"}}
                            onLoad={() => setShowConfirmation(true)}></iframe>

                    {/* Confirmation Message */}
                    {/*{showConfirmation && (*/}
                    {/*    <div id="confirmation" style={{color: "green", fontWeight: "bold", marginTop: "14px", zIndex: "999" }}>*/}
                    {/*        ✅ Thank you! Your submission has been received.*/}
                    {/*    </div>*/}
                    {/*)}*/}

                    {/*{showConfirmation && (*/}
                    {/*    <div id="confirmation"*/}
                    {/*         style={{*/}
                    {/*             position: "absolute",  // Make it float above everything*/}
                    {/*             top: "50%",            // Center it vertically*/}
                    {/*             left: "50%",           // Center it horizontally*/}
                    {/*             transform: "translate(-50%, -50%)", // Ensure perfect centering*/}
                    {/*             backgroundColor: "rgba(255, 255, 255, 0.9)", // Light background to ensure readability*/}
                    {/*             padding: "80px 90px",  // Increased padding for more height*/}
                    {/*             borderRadius: "8px",*/}
                    {/*             boxShadow: "0px 40px 10px rgba(0,0,0,0.2)", // Add some shadow for contrast*/}
                    {/*             zIndex: "9999",        // Ensure it's above the blur overlay*/}
                    {/*             color: "green",*/}
                    {/*             fontWeight: "bold",*/}
                    {/*             fontSize: "1.2em",*/}
                    {/*             textAlign: "center",*/}
                    {/*         }}*/}
                    {/*    >*/}
                    {/*        ✅ {translations[language].thanksMessage}*/}
                    {/*    </div>*/}
                    {/*)}*/}

                    {showConfirmation && (
                        <div id="confirmation-overlay"
                             style={{
                                 position: "fixed",  // Full-screen overlay
                                 top: "0",
                                 left: "0",
                                 width: "100%",
                                 height: "100%",
                                 backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent dark background
                                 display: "flex",
                                 justifyContent: "center",
                                 alignItems: "center",
                                 zIndex: "99999" // Ensure it's above everything
                             }}
                        >
                            <div id="confirmation-box"
                                 style={{
                                     backgroundColor: "rgba(255, 255, 255, 0.95)", // White box for better visibility
                                     padding: "60px",
                                     width: "90%",
                                     maxWidth: "500px", // Keep it responsive
                                     borderRadius: "12px",
                                     boxShadow: "0px 6px 20px rgba(0,0,0,0.3)", // Subtle shadow for depth
                                     textAlign: "center",
                                     display: "flex",
                                     flexDirection: "column",
                                     justifyContent: "center",
                                     alignItems: "center",
                                 }}
                            >
                                <h2 style={{color: "green", fontSize: "1.5em", marginBottom: "20px"}}>
                                    ✅ {translations[language].thanksMessage}
                                </h2>

                                <button onClick={() => window.location.href = "/"}
                                        style={{
                                            marginTop: "20px",
                                            padding: "15px 30px",
                                            fontSize: "1.2em",
                                            backgroundColor: "#007bff",
                                            color: "white",
                                            border: "none",
                                            borderRadius: "8px",
                                            cursor: "pointer",
                                            transition: "background-color 0.3s ease"
                                        }}
                                >
                                    OK
                                </button>
                            </div>
                        </div>
                    )}


                </section>

                {/* Contact Section */}
                {/*<section id="contact" className="contact-info">*/}
                {/*    <h2>Contact Us</h2>*/}
                {/*    <a*/}
                {/*        href="/book"*/}
                {/*        target="_blank"*/}
                {/*        rel="noopener noreferrer"*/}
                {/*        className="contact-link"*/}
                {/*    >*/}
                {/*        Book with us*/}
                {/*    </a>*/}
                {/*    <a*/}
                {/*        href="https://t.me/yourtelegramusername"*/}
                {/*        target="_blank"*/}
                {/*        rel="noopener noreferrer"*/}
                {/*        className="contact-link"*/}
                {/*    >*/}
                {/*        Telegram*/}
                {/*    </a>*/}
                {/*    <a*/}
                {/*        href="https://wa.me/yourphonenumber"*/}
                {/*        target="_blank"*/}
                {/*        rel="noopener noreferrer"*/}
                {/*        className="contact-link"*/}
                {/*    >*/}
                {/*        WhatsApp*/}
                {/*    </a>*/}
                {/*    <a href="mailto:youremail@example.com" className="contact-link">*/}
                {/*        Email*/}
                {/*    </a>*/}
                {/*</section>*/}


            </main>

            <style jsx>{`
                body {
                    font-family: "Poppins", sans-serif;
                    margin: 0;
                    color: #333;
                    background-color: #f8f8f8;
                    line-height: 1.6;
                }

                .hero {
                    position: relative;
                    height: 85vh;
                    overflow: hidden;
                }

                .hero-image {
                    filter: brightness(0.5);
                }

                .glass-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    backdrop-filter: blur(6px) saturate(120%);
                    background: rgba(255, 255, 255, 0.15); /* Glass effect */
                    z-index: 1;
                }

                .hero-content {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    text-align: center;
                    color: white;
                    z-index: 2;
                }

                .hero-title {
                    font-family: "Playfair Display", serif;
                    font-size: 3.5em;
                    margin-bottom: 20px;
                    font-weight: 700;
                }

                .hero-subtitle {
                    font-size: 1.4em;
                    margin-bottom: 40px;
                }

                .cta-button {
                    display: inline-block;
                    padding: 15px 30px;
                    background-color: #007bff;
                    color: white;
                    text-decoration: none;
                    border-radius: 5px;
                    font-weight: 700;
                    transition: background-color 0.3s ease;
                }

                .cta-button:hover {
                    background-color: #0056b3;
                }

                .details {
                    padding: 40px;
                    text-align: center;
                }

                .details h2 {
                    font-size: 2em;
                    margin-bottom: 20px;
                }

                .details p {
                    font-size: 1.1em;
                    max-width: 800px;
                    margin: 0 auto;
                }

                .contact-info {
                    text-align: center;
                    padding: 30px;
                    background-color: #fff;
                    border-top: 1px solid #eee;
                }

                .submit-info {
                    text-align: center;
                    padding: 30px;
                    background-color: #fff;
                    border-top: 1px solid #eee;
                }

                .contact-link {
                    display: inline-block;
                    margin: 0 15px;
                    padding: 12px 25px;
                    background-color: #343a40;
                    color: white;
                    text-decoration: none;
                    border-radius: 5px;
                    transition: background-color 0.3s ease;
                }

                .contact-link:hover {
                    background-color: #23272b;
                }

                .booking-form {
                    display: flex;
                    flex-direction: column;
                    max-width: 500px;
                    margin: 0 auto;
                    text-align: left;
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

                @media (max-width: 768px) {
                    .hero-title {
                        font-size: 2.5em;
                    }

                    .hero-subtitle {
                        font-size: 1.2em;
                    }

                    .details h2 {
                        font-size: 1.6em;
                    }

                    .details p {
                        font-size: 1em;
                    }

                    .language-toggle {
                        bottom: 15px; /* Move slightly higher on small screens */
                        right: 7px; /* Adjust spacing */
                        width: 50px; /* Slightly smaller button */
                        height: 50px;
                        font-size: 20px; /* Smaller flag */
                    }
                }

                @media (max-width: 480px) {
                    .language-toggle {
                        bottom: 10px; /* Even higher to avoid mobile UI elements */
                        right: 10px;
                        width: 45px;
                        height: 45px;
                        font-size: 22px;
                    }
                }


                .submit-info {
                    position: relative;
                    padding: 50px 20px;
                    text-align: center;
                    background: url("https://cf.bstatic.com/xdata/images/hotel/max1280x900/492287971.jpg?k=9069d3d993a54148c97ed7fd9ab66a161edf90c9800f0a3a3e2fa3de808b2fef&o=&hp=1") no-repeat center center/cover;
                    color: white;
                    overflow: hidden;

                    /* Apply fading effect at edges */
                    -webkit-mask-image: linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 1) 80%, rgba(0, 0, 0, 0) 100%);
                    mask-image: linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 1) 80%, rgba(0, 0, 0, 0) 100%);


                }

                .submit-info::before {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    backdrop-filter: blur(6px) saturate(120%);
                    background: rgba(255, 255, 255, 0.15); /* Glass effect */
                    z-index: 1;
                }

                .submit-info h1,
                .submit-info p,
                .submit-info form {
                    position: relative;
                    z-index: 2;
                }

                .features {
                    list-style: none;
                    padding: 0;
                    max-width: 800px;
                    margin: 0 auto 20px;
                    text-align: left;
                }

                .features li {
                    font-size: 1.2em;
                    margin-bottom: 10px;
                    padding-left: 25px;
                    position: relative;
                }

                .features li::before {
                    content: "✔";
                    color: #ffcc00;
                    font-size: 1.3em;
                    position: absolute;
                    left: 0;
                    top: 0;
                }

                //.language-toggle {
                //    display: flex;
                //    align-items: center;
                //    background-color: transparent;
                //    border: none;
                //    font-size: 16px;
                //    font-weight: bold;
                //    cursor: pointer;
                //    transition: 0.3s;
                //}
                //
                //.language-toggle:hover {
                //    opacity: 0.7;
                //}


                //.language-toggle {
                //    display: flex;
                //    align-items: center;
                //    justify-content: center;
                //    gap: 8px; /* Space between flag and text */
                //    padding: 10px 16px;
                //    font-size: 18px;
                //    font-weight: bold;
                //    color: #fff;
                //    background-color: #007bff; /* Standard blue for buttons */
                //    border: 2px solid transparent;
                //    border-radius: 8px;
                //    cursor: pointer;
                //    transition: all 0.3s ease-in-out;
                //    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                //}
                //
                //.language-toggle:hover {
                //    background-color: #0056b3; /* Darker blue on hover */
                //    transform: scale(1.05); /* Slight zoom-in effect */
                //    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
                //}
                //
                //.language-toggle:active {
                //    background-color: #004494; /* Even darker blue when clicked */
                //    transform: scale(0.98); /* Slight press effect */
                //}
                //
                //.flag {
                //    font-size: 24px;
                //}
                //
                //.text {
                //    font-size: 18px;
                //}


                .language-toggle {
                    position: fixed;
                    //bottom: 800px;
                    //right: 850px;

                    top: 5%;
                    right: 90%;

                    width: 60px;
                    height: 60px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: rgba(243, 255, 73, 0.34); /* Primary Blue */
                    color: white;
                    font-size: 42px; /* Bigger flag */
                    border: none;
                    border-radius: 50%;
                    cursor: pointer;
                    transition: all 0.3s ease-in-out;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                    z-index: 1000;
                }

                //.language-toggle {
                //    top: 50%;
                //    right: 20px;
                //    transform: translateY(-50%);
                //}


                .language-toggle:hover {
                    background-color: #0056b3; /* Darker blue on hover */
                    transform: scale(1.1); /* Slight zoom effect */
                    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
                }

                .language-toggle:active {
                    background-color: #004494; /* Even darker when clicked */
                    transform: scale(0.95); /* Slight press effect */
                }

                .language-toggle::after {
                    content: attr(data-tooltip);
                    position: absolute;
                    bottom: 70px;
                    background: rgba(0, 0, 0, 0.7);
                    color: white;
                    font-size: 14px;
                    padding: 6px 10px;
                    border-radius: 5px;
                    white-space: nowrap;
                    opacity: 0;
                    transition: opacity 0.2s;
                    pointer-events: none;
                }

                .language-toggle:hover::after {
                    opacity: 1;
                }

                .date-picker {
                    width: 100%;
                    padding: 10px;
                    font-size: 45px;
                    border: 2px solid #ddd;
                    border-radius: 5px;
                    outline: none;
                    transition: border 0.3s ease-in-out;
                }

                .date-picker:focus {
                    border-color: #007bff;
                }

            `}</style>
        </>
    );
}
