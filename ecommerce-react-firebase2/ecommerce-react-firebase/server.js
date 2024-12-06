const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
const port = 3001; // Vous pouvez changer ce port si nécessaire

// Middleware
app.use(express.json()); // Permet de traiter les requêtes en JSON
app.use(cors()); // Permet les requêtes cross-origin (utile pour la communication entre le frontend et le backend)

// Configuration du transporteur Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mariemshili766@gmail.com', // Votre adresse email
    pass: 'sisz umcg kvan gpkp',   // Utilisez une clé d'application pour plus de sécurité
  },
});

app.post('/api/sendOrderConfirmationEmail', async (req, res) => {
    const { userName, userEmail, totalQty, totalPrice, address, phoneNumber } = req.body;  
    // Premier e-mail au client
    const customerMailOptions = {
      from: 'mariemshili766@gmail.com', // Votre adresse email
      to: userEmail, // Email du client
      subject: 'Confirmation de commande',
      html: `
        <p>Merci pour votre commande, ${userName} !</p>
        <p>Quantité totale : ${totalQty}</p>
        <p>Prix total : ${totalPrice} DT</p>
        <p>La livraison sera effectuée dans les 24 heures à l'adresse suivante : ${address}</p>
        <p>Votre commande a été confirmée. Nous la traiterons sous peu.</p>
      `,
    };
  
    // Deuxième e-mail pour vous (l'administrateur)
    const adminMailOptions = {
        from: 'mariemshili766@gmail.com', // Votre adresse email
        to: 'mariemshili766@gmail.com', // Votre propre adresse email pour recevoir les notifications
        subject: `Nouvelle commande passée par ${userName}`,
        html: `
          <h3>Nouvelle commande reçue !</h3>
          <p><strong>Nom du client :</strong> ${userName}</p>
          <p><strong>Email du client :</strong> ${userEmail}</p>
          <p><strong>Numéro de téléphone :</strong> ${phoneNumber}</p>
          <p><strong>Adresse de livraison :</strong> ${address}</p>
          <p><strong>Quantité totale :</strong> ${totalQty} articles</p>
          <p><strong>Prix total :</strong> ${totalPrice} DT</p>
          <p><strong>Date et heure de la commande :</strong> ${new Date().toLocaleString()}</p>
          <br>
          <p>Veuillez vous assurer que la commande est traitée rapidement.</p>
          <p>Merci,</p>
          <p>Votre système e-commerce</p>
        `,
      };
      
  
    try {
      // Envoi de l'email au client
      await transporter.sendMail(customerMailOptions);
      console.log('Email de confirmation envoyé au client');
  
      // Envoi de l'email à l'administrateur
      await transporter.sendMail(adminMailOptions);
      console.log('Email d\'alerte de commande envoyé à l\'administrateur');
  
      res.status(200).send('Les emails ont été envoyés avec succès');
    } catch (error) {
      console.error("Erreur lors de l'envoi des emails :", error);
      res.status(500).send("Erreur lors de l'envoi des emails");
    }
});

app.listen(port, () => {
  console.log(`Le serveur fonctionne sur le port ${port}`);
});



