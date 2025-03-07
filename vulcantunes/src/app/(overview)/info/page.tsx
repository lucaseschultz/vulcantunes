'use client'

import '@/src/app/ui/overview/info/info.css'

export default function Page() {
  return (
    <div className="info-container">
      <section className="info-section">
        <h2>About Us</h2>
        <p>VulcanTunes.com was launched to provide high quality and innovative new audio connectivity options for the Kawasaki Vulcan motorcycle</p>
      </section>

      <section className="info-section">
        <h2>Shipping</h2>
        <p>We ship to pretty much anywhere with a functioning postal system that is reachable by packages that have been shipped from the United States</p>
      </section>

      <section className="info-section">
        <h2>Product Returns</h2>
        <p>All products are refundable. We stand behind our products 100%, so if they fail to do what you need them to do, we happily accept returns and will refund your purchase price</p>
        <div className="fine-print">
          <p>Refunds will only be processed upon our receipt of the product</p>
          <ul>
            <li>Defective products are entitled to a 100% refund including shipping costs</li>
            <li>Non-defective product returns will only be refunded the purchase price of the product itself. Shipping costs will not be refunded</li>
          </ul>
        </div>
      </section>

      <section className="info-section">
        <h2>Contact Us</h2>
        <p>We love hearing from and helping our customers. Just fill out and submit the form below and we'll get back to you ASAP</p>

        <form className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" placeholder="*" required />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="*" required />
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject:</label>
            <input type="text" id="subject" name="subject" placeholder="*" required />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" rows={5} placeholder="*" required></textarea>
          </div>

          <button type="submit" className="submit-button">Send Message</button>
        </form>
      </section>
    </div>
  );
};
