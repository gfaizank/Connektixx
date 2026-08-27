import { onRequest } from 'firebase-functions/v2/https';
import { defineSecret } from 'firebase-functions/params';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import Anthropic from '@anthropic-ai/sdk';

// Secrets (set via: firebase functions:secrets:set SECRET_NAME)
const ANTHROPIC_API_KEY = defineSecret('ANTHROPIC_API_KEY');
const EMAIL_SERVICE     = defineSecret('EMAIL_SERVICE');
const EMAIL_USER        = defineSecret('EMAIL_USER');
const EMAIL_PASS        = defineSecret('EMAIL_PASS');
const RECIPIENT_EMAIL   = defineSecret('RECIPIENT_EMAIL');

const SYSTEM_PROMPT = `You are Connie, a friendly and knowledgeable AI assistant for Connektixx — a performance marketing agency specialising in Meta Ads, Google Ads, Shopify growth, and influencer marketing. You help visitors understand Connektixx's services, answer questions about performance marketing, and guide them towards booking a consultation. Keep replies concise (2-4 sentences max) and conversational. If asked something outside your scope, politely redirect to Connektixx's offerings or suggest they fill out the contact form.`;

const app = express();
app.use(cors({ origin: true }));
app.use(bodyParser.json());

app.get('/', (_req, res) => res.json({ status: 'success', message: 'Connektixx API running' }));

// ── Contact form ─────────────────────────────────────────────────────────────
app.post('/api/contact', async (req, res) => {
  const { name, company, email, phone, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ status: 'error', message: 'name, email and message are required' });
  }
  try {
    const transporter = nodemailer.createTransport({
      service: EMAIL_SERVICE.value(),
      auth: { user: EMAIL_USER.value(), pass: EMAIL_PASS.value() },
    });
    await transporter.sendMail({
      from: EMAIL_USER.value(),
      to: RECIPIENT_EMAIL.value() || 'pragya.shukla@connektixx.com',
      subject: `New Contact Form Submission from ${name}`,
      html: `<h3>New Contact Form Submission</h3>
             <p><strong>Name:</strong> ${name}</p>
             <p><strong>Company:</strong> ${company || 'Not provided'}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
             <p><strong>Message:</strong> ${message}</p>`,
    });
    res.json({ status: 'success', message: 'Your message has been sent. We will contact you soon!' });
  } catch (err) {
    console.error('Contact error:', err);
    res.status(500).json({ status: 'error', message: 'Failed to send message. Please try again.' });
  }
});

// ── Chat (Anthropic) ─────────────────────────────────────────────────────────
app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ status: 'error', message: 'messages array required' });
  }
  try {
    const anthropic = new Anthropic({ apiKey: ANTHROPIC_API_KEY.value() });
    const response = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 512,
      system: SYSTEM_PROMPT,
      messages,
    });
    res.json({ status: 'success', reply: response.content[0].text });
  } catch (err) {
    console.error('Chat error:', err);
    res.status(500).json({ status: 'error', message: 'Failed to get response. Please try again.' });
  }
});

export const api = onRequest(
  {
    region: 'us-central1',
    secrets: [ANTHROPIC_API_KEY, EMAIL_SERVICE, EMAIL_USER, EMAIL_PASS, RECIPIENT_EMAIL],
    timeoutSeconds: 60,
    memory: '256MiB',
  },
  app,
);
