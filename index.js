
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const path = require('path');

// Configuración de comandos
const commands = {
  '.ping': 'Pong!',
  '.hello': 'Hola, ¿cómo estás?',
  '.info': 'Este es un bot de ejemplo creado con Node.js y whatsapp-web.js.',
  '.goodbye': 'Adiós, ¡nos vemos pronto!',
  '.help': 'Comandos disponibles:\n.ping\n.hello\n.info\n.goodbye\n.help'
};

// Crear cliente de WhatsApp
const client = new Client({
  authStrategy: new LocalAuth()
});

// Verificar si el directorio "comandos" existe
const comandosPath = path.join(__dirname, 'comandos');
if (!fs.existsSync(comandosPath)) {
    console.log("El directorio 'comandos' no existe, creándolo...");
    fs.mkdirSync(comandosPath);
}

// Generar código QR para el emparejamiento
client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
  console.log('Escanea el código QR con tu WhatsApp.');
});

// Cuando el cliente esté listo
client.on('ready', () => {
  console.log('El bot está listo.');
});

// Escuchar mensajes
client.on('message', async message => {
  if (message.body in commands) {
    message.reply(commands[message.body]);
  }
});

// Iniciar sesión
client.initialize();
