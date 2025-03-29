import React from 'react';

const Contact = () => {
    return (
        <div>
            <h1>Contact Us</h1>
            <p>Address: 123 Main Street, Anytown, USA</p>
            <p>Phone: (123) 456-7890</p>
            <p>Email: contact@shop.com</p>
            <div style={{ width: '100%', height: '400px' }}>
                <iframe
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    style={{ border: 0 }}
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5832.731753801604!2d108.21401767784303!3d16.03369364505727!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314218389cf02c2b%3A0xbdc63233587e2d88!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyDEkMO0bmcgw4E!5e0!3m2!1svi!2s!4v1741425115955!5m2!1svi!2s"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
};

export default Contact;