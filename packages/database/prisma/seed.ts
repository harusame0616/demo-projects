import { PrismaClient } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";

async function main() {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  const result = await supabase.storage.createBucket("company-newsletter", {
    public: false,
    fileSizeLimit: 1024 * 1024 * 10, // 10MB
  });
  if (result.error && result.error.message !== "The resource already exists") {
    throw new Error(result.error.message);
  }

  const prisma = new PrismaClient();
  try {
    await prisma.$executeRawUnsafe(
      `CREATE POLICY "company-newsletter-select" ON storage.objects FOR SELECT TO authenticated, service_role USING (bucket_id = 'company-newsletter');`,
    );
    await prisma.$executeRawUnsafe(
      `CREATE POLICY "company-newsletter-insert" ON storage.objects FOR INSERT TO authenticated, service_role WITH CHECK (bucket_id = 'company-newsletter');`,
    );
  } catch (e: unknown) {
    if (!(e as Error).message.includes("already exists")) {
      throw e;
    }
  }
}

main().catch((e) => {
  throw e;
});
