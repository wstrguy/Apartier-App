// importing database
require ('dotenv').config();
const Pool = require('../database/db');
require ('../utils/passport-user');
const axios = require('axios');




// Book shortlet
exports.bookShortlet = async (req, res) => {
    const user = req.user;
    const { numOfNight} = req.body;
    const shortlet_id  = req.params.shortlet_id;

    try {
        const id = Number(shortlet_id);
        // check if shortlet is already booked by shortlet_id
        const sql1 = 'SELECT * FROM Apartier.shortlets WHERE id = ?';
        const data1 = await Pool.query(sql1, id);
        // console.log(data1[0][0]);
        if (data1[0][0].status === 'booked') {
            return res.status(400).json({
                message: 'Shortlet already booked',
            });
        }
        let amount = data1[0][0].price * numOfNight;

        const paystackAmount = amount.toString() + '00'; // paystack amount is in kobo

        const data = {
            email: user.email,
            amount: paystackAmount,
        }

        const config = {
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                "Content-Type": "application/json",
        }
    }
        const paystackInstance = await axios.post(
            'https://api.paystack.co/transaction/initialize',
            data,
            config
                )

// console.log(paystackInstance);

        const paystackData = paystackInstance.data.data;



        const savePayment = await Pool.query('INSERT INTO bookings (shortlet_id, user_id, num_of_nights, amount, payment_ref) VALUES (?, ?, ?, ?, ?)', 
        [shortlet_id, user.id, numOfNight, Number(amount), paystackData.reference]);

        return res.status(200).json({message: "shorlet booked successfully", payment_url: paystackData.authorization_url, payment_ref: paystackData.reference});



        
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

exports.verifyPayment = async (req, res) => {
    const id = req.user.id;
    try {
        const paystackInstance = axios.create({
            baseURL: 'https://api.paystack.co',
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                "Content-Type": "application/json",
            },
        })

        const getBookingDetails = await Pool.query("SELECT * FROM bookings WHERE user_id = ?", [id]);

        const paymentRef = getBookingDetails[0][0].payment_ref;
        const response = await paystackInstance.get(`/transaction/verify/${paymentRef}`);

        console.log(paymentRef);

        if (response.data.data.status === 'success') {
            await Pool.query("UPDATE bookings SET status = 'approved' WHERE user_id = ?", [id]);
            await Pool.query("UPDATE shortlets SET status = 'booked' WHERE id = ?", [getBookingDetails[0][0].shortlet_id]);
            return res.status(200).json({message: "Payment successful"});
        } else {
            return res.status(400).json({message: "Payment failed"});
        } 
        
    } catch (error) {
      return res.status(500).json({message: error.message})  
    }
}