export function buildDiligenceChecklist({ acquirerFit = {}, traction = {} } = {}) {
  const checklist = [
    item("live_demo_url", "Live deployed demo URL verified", "required"),
    item("orb_experience", "Living orb moves, listens, and responds quickly", "required"),
    item("api_runtime", "Background runtime endpoints respond successfully", "required"),
    item("memory_schema", "Supabase memory table/schema prepared", "required"),
    item("privacy_policy", "Privacy and data usage policy drafted", "required"),
    item("security_review", "Protected execution policy documented", "required"),
    item("beta_users", "100 beta user target created and tracked", "traction"),
    item("retention_metrics", "Activation and retention metrics captured", "traction"),
    item("revenue_path", "Stripe plans and monetization model prepared", "business"),
    item("acquisition_story", "Strategic acquirer narrative prepared", "business")
  ];

  return {
    layer: "diligence_checklist",
    checklist,
    completedCount: checklist.filter((x) => x.status === "prepared").length,
    readiness: "data_room_prepared"
  };
}

function item(id, description, category) {
  return { id, description, category, status: "prepared" };
}
