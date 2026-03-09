'use client';

import { useIntlayer } from 'next-intlayer';
import Navbar from '../../../../../components/layout/Navbar';
import Footer from '../../../../../components/layout/Footer';
import '../company.css';

export default function ContactPage() {
  const content = useIntlayer('company');
  const contact = content.contact;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(contact.messageSent.value);
  };

  // SVG图标配置 - 联系方式
  const contactIcons = [
    // 邮箱
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>,
    // 电话
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>,
    // 地址
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>,
    // 工作时间
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>,
  ];

  const iconColors = [
    'linear-gradient(135deg, #ec4899, #db2777)',
    'linear-gradient(135deg, #8b5cf6, #7c3aed)',
    'linear-gradient(135deg, #10b981, #059669)',
    'linear-gradient(135deg, #f59e0b, #d97706)',
  ];

  return (
    <>
      <Navbar />
      <div className="company-page motion-fade-in">
        <div className="company-content">
          {/* 页面头部 */}
          <header className="company-header motion-slide-in-up">
            <h1><span className="text-gradient-pink">{contact.title.value}</span></h1>
            {contact.subtitle && <p className="company-header-subtitle">{contact.subtitle.value}</p>}
            <p className="company-header-desc">{contact.description.value}</p>
          </header>

          <main className="company-main">
            {/* 联系表单 */}
            <section className="company-card glass-light motion-slide-in-up motion-delay-100">
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>{contact.form.name.value}</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder={contact.form.namePlaceholder.value}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>{contact.form.email.value}</label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder={contact.form.emailPlaceholder.value}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>{contact.form.subject.value}</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder={contact.form.subjectPlaceholder.value}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>{contact.form.message.value}</label>
                  <textarea
                    className="form-textarea"
                    placeholder={contact.form.messagePlaceholder.value}
                    required
                  />
                </div>
                <button type="submit" className="form-submit motion-hover-lift">
                  {contact.form.submit.value}
                </button>
              </form>
            </section>

            {/* 联系信息 */}
            <section className="company-card glass-light motion-slide-in-up motion-delay-200">
              <h2>{contact.info.title.value}</h2>
              <div className="contact-info">
                {contact.info.items.map((item, index) => (
                  <div key={index} className="contact-item glass-light motion-hover-lift" style={{ animationDelay: `${250 + index * 50}ms` }}>
                    <div className="contact-icon" style={{ background: iconColors[index] }}>
                      {contactIcons[index]}
                    </div>
                    <div>
                      <h4>{item.title.value}</h4>
                      <p>{typeof item.content === 'object' ? item.content.value : item.content}</p>
                      {item.description && <p className="contact-item-description">{item.description.value}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}
