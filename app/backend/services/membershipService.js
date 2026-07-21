import { supabaseAnon, supabaseServiceRole } from "../config/supabaseConfig.js";

export const membershipPlansService = async () => {
  const { data, error } = await supabaseServiceRole
    .from("membership_plan")
    // .select("*");
    .select(`
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
      `//);
      )
      .order('id_membership_plan');
    // .single();
  if (error) throw new Error(error.message);
  return data;
};

export const membershipPlansByIdService = async (id_membership_plan) => {
  const { data, error } = await supabaseServiceRole
    .from("membership_plan")
    // .select("*");
    .select(`
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
      `//);
      )
    //   .order('id_membership_plan')
    .eq("id_membership_plan", id_membership_plan)
    .single();
  if (error) throw new Error(error.message);
  return data;
};