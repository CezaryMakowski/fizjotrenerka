-- AlterTable
ALTER TABLE "PasswordResetToken" ADD CONSTRAINT "PasswordResetToken_pkey" PRIMARY KEY ("token");

-- AlterTable
ALTER TABLE "VerificationToken" ADD CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("token");
