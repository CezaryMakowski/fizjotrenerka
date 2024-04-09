import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from "@react-email/components";

export default function UserVerify({
  name,
  token,
}: {
  name: string;
  token: string;
}) {
  return (
    <Html>
      <Head />
      <Preview>Zapomniałeś/łaś hasła? żaden problem</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Cześć, {name} 😄</Heading>
          <Text style={paragraph}>
            Naciśnij przycisk poniżej a przeniesiemy cię do formularza, gdzie
            będziesz w stanie zresetować swoje hasło
          </Text>
          <Button
            style={button}
            href={`http://localhost:3000/login/reset-hasla/${token}`}
          >
            resetuj hasło
          </Button>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "560px",
  textAlign: "center" as const,
};

const heading = {
  fontSize: "28px",
  letterSpacing: "-0.5px",
  lineHeight: "1.3",
  fontWeight: "400",
  color: "#578cb5",
  padding: "17px 0 0",
};

const paragraph = {
  margin: "0 0 15px",
  fontSize: "15px",
  lineHeight: "1.4",
  color: "#3c4149",
};

const button = {
  backgroundColor: "#ffc0cb",
  borderRadius: "15px",
  fontWeight: "600",
  color: "#fff",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "11px 23px",
  width: "fit-content",
  margin: "auto",
};
