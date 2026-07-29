import { supabaseAnon, supabaseServiceRole } from "../config/supabaseConfig.js";

export const paymentMethodByNameService = async (paymentMethodName) => {
  const { data, error } = await supabaseServiceRole
    .from("payment_method")
    // .select("*");
    .select(`
        id_payment_method, 
        title,
        image_qr,
        image_logo
      `//);
      )
    //   .order('id_membership_plan')
    .eq("title", paymentMethodName)
    .single();
  if (error) throw new Error(error.message);
  return data;
};

export const paymentCheckOutService = async (dataPayment) => {
  const { data, error } = await supabaseServiceRole
  .from("payments")
  .insert({
    id_user:dataPayment.id_user,
    id_membership_plan:dataPayment.id_membership_plan,
    id_payment_method:dataPayment.id_payment_method,
    id_transaction:dataPayment.id_transaction,
    status:dataPayment.status
    // user_metadata: { role: userData.role, name: userData.fullName, date_of_birth: userData.birthDateJSON, gender: userData.gender, emergency_contact_phone: userData.emergencyContactNo, emergency_contact_name: userData.emergencyContactName }
  })
  .select();
  if (error) throw new Error(error.message);
  return data;
};

export const paymentHistoryByIdUserService = async (id_user) => {
  const { data, error } = await supabaseServiceRole
    .from("payments")
    // .select("*")
    .select(`
        id_payments,
        id_user,
        id_transaction,
        date,
        membership_plan(
            id_membership_plan, 
            title,
            description,
            price,
            membership_type (
                id_membership_type,
                title
            ),
            membership_quota (
                id_membership_quota,
                id_membership_type,
                quota
            )
        ),
        payment_method(
            id_payment_method, 
            title,
            image_qr,
            image_logo
        ),
        payment_status(
            id_payment_status, 
            title
        )
      `//);
      )
      .order('id_payments')
    .eq("id_user", id_user)
    // .single();
  if (error) throw new Error(error.message);
  return data;
};