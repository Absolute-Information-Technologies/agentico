'use client';

import { useState, FormEvent } from 'react';
import { Locale } from '../lib/i18n';

type ContactFormProps = {
  dictionary: any;
  locale: Locale;
  solution?: string;
  industry?: string;
  market?: string;
  isDemo?: boolean;
};

export default function ContactForm({ 
  dictionary, 
  locale, 
  solution: initialSolution, 
  industry: initialIndustry,
  market: initialMarket,
  isDemo = false 
}: ContactFormProps) {
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [industry, setIndustry] = useState(initialIndustry || '');
  const [message, setMessage] = useState('');
  const [solution, setSolution] = useState(initialSolution || '');
  const [market, setMarket] = useState(initialMarket || '');
  const [interests, setInterests] = useState<string[]>([]);
  
  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Validation state
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Reset states
    setError(null);
    setErrors({});
    
    // Validate form
    const newErrors: Record<string, string> = {};
    
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!company.trim()) {
      newErrors.company = 'Company is required';
    }
    
    if (isDemo && !industry) {
      newErrors.industry = 'Industry is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Submit form
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      setIsSubmitted(true);
      
      // Reset form
      setName('');
      setEmail('');
      setCompany('');
      setPhone('');
      setIndustry('');
      setMessage('');
      setSolution('');
      setMarket('');
      setInterests([]);
    } catch (err) {
      setError('An error occurred while submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Toggle interest selection
  const toggleInterest = (interest: string) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter(i => i !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };
  
  // If form was submitted successfully, show success message
  if (isSubmitted) {
    return (
      <div className="bg-green-50 p-6 rounded-lg border border-green-100 text-center">
        <svg className="mx-auto h-12 w-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-lg font-medium text-green-800 mt-3">Thank you for your message!</h3>
        <p className="text-green-700 mt-2">
          {isDemo 
            ? 'We have received your demo request and will contact you shortly to schedule a personalized demonstration.'
            : 'We have received your message and will get back to you as soon as possible.'}
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
        >
          Send another message
        </button>
      </div>
    );
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 p-4 rounded-md border border-red-100">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}
      
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          {dictionary.contact.form.name} <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
            errors.name ? 'border-red-300' : 'border-gray-300'
          }`}
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          {dictionary.contact.form.email} <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
            errors.email ? 'border-red-300' : 'border-gray-300'
          }`}
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
      </div>
      
      <div>
        <label htmlFor="company" className="block text-sm font-medium text-gray-700">
          {dictionary.contact.form.company} <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
            errors.company ? 'border-red-300' : 'border-gray-300'
          }`}
        />
        {errors.company && <p className="mt-1 text-sm text-red-600">{errors.company}</p>}
      </div>
      
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          {dictionary.contact.form.phone}
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      
      <div>
        <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
          {dictionary.contact.form.industry} {isDemo && <span className="text-red-500">*</span>}
        </label>
        <select
          id="industry"
          name="industry"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
            errors.industry ? 'border-red-300' : 'border-gray-300'
          }`}
        >
          <option value="">Select an industry</option>
          <option value="restaurants">Restaurants</option>
          <option value="hospitality">Hospitality</option>
          <option value="healthcare">Healthcare</option>
          <option value="retail">Retail</option>
          <option value="education">Education</option>
          <option value="automotive">Automotive</option>
          <option value="legal">Legal</option>
          <option value="real-estate">Real Estate</option>
          <option value="professional-services">Professional Services</option>
          <option value="mental-health">Mental Health</option>
          <option value="call-centers">Call Centers</option>
          <option value="other">Other</option>
        </select>
        {errors.industry && <p className="mt-1 text-sm text-red-600">{errors.industry}</p>}
      </div>
      
      {isDemo && (
        <div>
          <label htmlFor="solution" className="block text-sm font-medium text-gray-700">
            Solution of Interest
          </label>
          <select
            id="solution"
            name="solution"
            value={solution}
            onChange={(e) => setSolution(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select a solution</option>
            <option value="voice-assistant">Voice Assistant</option>
            <option value="order-automation">Order Automation</option>
            <option value="appointment-scheduling">Appointment Scheduling</option>
            <option value="customer-service">Customer Service</option>
            <option value="voice-authentication">Voice Authentication</option>
            <option value="custom">Custom Solution</option>
          </select>
        </div>
      )}
      
      <div>
        <span className="block text-sm font-medium text-gray-700 mb-2">
          Areas of Interest
        </span>
        <div className="space-y-2">
          {['Cost Reduction', 'Customer Experience', 'Operational Efficiency', 'Revenue Growth', 'Security & Compliance'].map((interest) => (
            <div key={interest} className="flex items-center">
              <input
                id={`interest-${interest}`}
                name="interests"
                type="checkbox"
                checked={interests.includes(interest)}
                onChange={() => toggleInterest(interest)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor={`interest-${interest}`} className="ml-3 text-sm text-gray-700">
                {interest}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          {dictionary.contact.form.message}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
        ></textarea>
      </div>
      
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          }`}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            dictionary.contact.form.submit
          )}
        </button>
        <p className="mt-2 text-xs text-gray-500">
          {dictionary.contact.form.privacy_notice}
        </p>
      </div>
    </form>
  );
}
