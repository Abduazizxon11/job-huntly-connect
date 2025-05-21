
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<"JOB_SEEKER" | "COMPANY">("JOB_SEEKER");
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("Parollar mos kelmaydi");
      return;
    }

    setIsLoading(true);
    
    try {
      await register(email, password, role);
      toast.success("Muvaffaqiyatli ro'yxatdan o'tdingiz!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Registration error:", error);
      // Error is already handled by API service
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-bold">Ro'yxatdan o'tish</CardTitle>
          <CardDescription>
            Ish qidirish yoki e'lon qilish uchun ro'yxatdan o'ting
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Parol</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Parolni tasdiqlang</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label>Hisobingiz turi</Label>
              <RadioGroup defaultValue={role} onValueChange={(value) => setRole(value as "JOB_SEEKER" | "COMPANY")}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="JOB_SEEKER" id="job-seeker" />
                  <Label htmlFor="job-seeker">Ish izlayotgan</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="COMPANY" id="company" />
                  <Label htmlFor="company">Kompaniya</Label>
                </div>
              </RadioGroup>
            </div>
            
            <Button
              type="submit"
              className="w-full bg-brand-500 hover:bg-brand-600"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                  Ro'yxatdan o'tilmoqda...
                </span>
              ) : (
                "Ro'yxatdan o'tish"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="text-center text-sm">
            Hisobingiz bormi?{" "}
            <Link
              to="/login"
              className="font-medium text-brand-500 hover:text-brand-600"
            >
              Kirish
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
