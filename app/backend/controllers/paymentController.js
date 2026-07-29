import { 
  paymentMethodByNameService,
  paymentCheckOutService,
  paymentHistoryByIdUserService
} from "../services/paymentService.js";

export const paymentMethodByName = async (req, res) => {
 try {
     const {paymentMethodName} = req.params;
     const paymentMethodByName = await paymentMethodByNameService(paymentMethodName);
     res.status(200).json(paymentMethodByName);
   } catch (error) {
     res.status(500).json({ error: error.message });
   }
};

export const paymentCheckOut = async (req, res) => {
 try {
     const dataPayment = req.body;
     console.log(dataPayment);
     const paymentCheckOut = await paymentCheckOutService(dataPayment);
     res.status(200).json(paymentCheckOut);
   } catch (error) {
     res.status(500).json({ error: error.message });
   }
};

export const paymentHistoryByIdUser = async (req, res) => {
 try {
     const {id_user} = req.params;
     console.log(id_user);
     const paymentHistoryByIdUser = await paymentHistoryByIdUserService(id_user);
     res.status(200).json(paymentHistoryByIdUser);
   } catch (error) {
     res.status(500).json({ error: error.message });
   }
};