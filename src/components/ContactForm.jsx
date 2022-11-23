import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';

const encode = (data) =>
  Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');

function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState([]);
  const [formState, setFormState] = useState('pending');

  const clearState = () => {
    setName('');
    setEmail('');
    setMessage('');
    setErrors([]);
  };

  const formMessages = {
    error: 'Required fields missing.',
    success: 'Message sent!',
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setFormState('pending');

    const validationErrs = [];
    if (!email) validationErrs.push('email');
    if (!message) validationErrs.push('message');

    setErrors(validationErrs);

    if (validationErrs.length) {
      setFormState('error');
      return;
    }

    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'contact', name, email, message }),
      });
      if (!res.ok) throw new Error(formMessages.error);
      setFormState('success');
      clearState();
    } catch (error) {
      setErrors([...errors, 'failed']);
      setFormState('error');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      width="100%"
      my={3}
      name="contact"
      netlify="true"
    >
      <Grid container spacing={2}>
        <Grid item xs={0} md={3} />
        <Grid item xs={12} md={3}>
          <TextField
            label="Your Name"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.includes('name')}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            label="Your Email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.includes('email')}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={0} md={3} />
        <Grid item xs={0} md={3} />
        <Grid item xs={12} md={6}>
          <TextField
            label="Message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            error={errors.includes('message')}
            fullWidth
            multiline
            rows={3}
            required
          />
        </Grid>
        <Grid item xs={0} md={3} />

        {formState !== 'pending' && (
          <>
            <Grid item xs={0} md={3} />
            <Grid item xs={12} md={6}>
              <Alert severity={formState}>
                {errors.includes('failed')
                  ? 'Message failed to send, please try again.'
                  : formMessages[formState]}
              </Alert>
            </Grid>
            <Grid item xs={0} md={3} />
          </>
        )}
        <Grid item xs={0} md={3} />
        <Grid item xs={12} md={6}>
          <Button type="submit" size="large" variant="contained" fullWidth>
            Send
          </Button>
        </Grid>
        <Grid item xs={0} md={3} />
      </Grid>
    </Box>
  );
}

export default ContactForm;
