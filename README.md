# eSkapis

## Pirms megini runot jaielade un jasetupo postgres, shadcn, next.js, react ##

##Vel vajag:##
1. Authentification (
2. Lai pie Select outfit dropdowni un pogas strada
3. Lai Outfit preview strada ar bultinam un lai radas bildes


Kods auth frontendam:
```tsx
import { LoginForm } from "../../components/login-form"

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <LoginForm />
      </div>
    </div>
  )
}
```

   


