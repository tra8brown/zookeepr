const path = require('path');
const router = require('express').Router();

//11.3.4. adding html route /animals
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/index.html"));
});

router.get("/animals", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/animals.html"));
});

//11.3.6
router.get("/zookeepers", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/zookeepers.html"));
});

//catch all/wildcard route
router.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

module.exports = router;