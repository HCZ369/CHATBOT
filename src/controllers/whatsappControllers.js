const verifyToken = (req, res) => {
    res.send("Hola verifyToken");
};

const receivedMessage = (req, res) => {
    res.send("Hola Received");
};

module.exports = {
    verifyToken,
    receivedMessage
};