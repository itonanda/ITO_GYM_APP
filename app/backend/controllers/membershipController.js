import { 
  membershipPlansService,
  membershipPlansByIdService,
} from "../services/membershipService.js";

export const membershipPlans = async (req, res) => {
 try {
    //  const data = req.body;
     const membershipPlans = await membershipPlansService();
     res.status(200).json(membershipPlans);
   } catch (error) {
     res.status(500).json({ error: error.message });
   }
};

export const membershipPlansById = async (req, res) => {
 try {
     const {id_membership_plan} = req.params;
     const membershipPlansById = await membershipPlansByIdService(id_membership_plan);
     res.status(200).json(membershipPlansById);
   } catch (error) {
     res.status(500).json({ error: error.message });
   }
};