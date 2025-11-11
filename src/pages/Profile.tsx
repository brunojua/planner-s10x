"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { showSuccess, showError } from "@/utils/toast";
import { useSession } from "@/components/SessionContextProvider";

// Schema para o formulário de atualização de email
const emailFormSchema = z.object({
  email: z.string().email({ message: "Por favor, insira um email válido." }),
});

// Schema para o formulário de atualização de senha
const passwordFormSchema = z.object({
  password: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres." }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem.",
  path: ["confirmPassword"],
});

const Profile = () => {
  const { session } = useSession();
  const userEmail = session?.user?.email || "";

  // Formulário de email
  const emailForm = useForm<z.infer<typeof emailFormSchema>>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      email: userEmail,
    },
  });

  // Formulário de senha
  const passwordForm = useForm<z.infer<typeof passwordFormSchema>>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  // Atualiza o valor padrão do email quando a sessão muda
  React.useEffect(() => {
    emailForm.reset({ email: userEmail });
  }, [userEmail, emailForm]);

  const handleUpdateEmail = async (values: z.infer<typeof emailFormSchema>) => {
    try {
      const { error } = await supabase.auth.updateUser({ email: values.email });
      if (error) throw error;
      showSuccess("Email atualizado com sucesso! Verifique sua caixa de entrada para confirmar.");
    } catch (error: any) {
      showError(`Erro ao atualizar email: ${error.message}`);
    }
  };

  const handleUpdatePassword = async (values: z.infer<typeof passwordFormSchema>) => {
    try {
      const { error } = await supabase.auth.updateUser({ password: values.password });
      if (error) throw error;
      showSuccess("Senha atualizada com sucesso!");
      passwordForm.reset(); // Limpa os campos de senha
    } catch (error: any) {
      showError(`Erro ao atualizar senha: ${error.message}`);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Meu Perfil</h1>

      <Card>
        <CardHeader>
          <CardTitle>Atualizar Email</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...emailForm}>
            <form onSubmit={emailForm.handleSubmit(handleUpdateEmail)} className="space-y-4">
              <FormField
                control={emailForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="seu@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={emailForm.formState.isSubmitting}>
                {emailForm.formState.isSubmitting ? "Atualizando..." : "Atualizar Email"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Atualizar Senha</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...passwordForm}>
            <form onSubmit={passwordForm.handleSubmit(handleUpdatePassword)} className="space-y-4">
              <FormField
                control={passwordForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nova Senha</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={passwordForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar Nova Senha</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={passwordForm.formState.isSubmitting}>
                {passwordForm.formState.isSubmitting ? "Atualizando..." : "Atualizar Senha"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;