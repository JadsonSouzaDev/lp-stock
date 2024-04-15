import { Facebook, Instagram, Twitter } from "lucide-react";
import { FC } from "react";

const Footer: FC = () => {
  return (
    <footer className="flex flex-col w-full  bg-amber-950  text-white">
      <div className="flex py-8">
        <div className="flex flex-col w-1/2 p-8">
          <h3 className="text-xl font-bold">Atendimento:</h3>
          <p className="mt-4 text-sm">
            Política de Vendas, Trocas e Privacidade
          </p>
          <p className="mt-4 text-sm">Termos e Condições de Uso do Site</p>
          <p className="mt-4 text-sm">Fale Conosco</p>
        </div>
        <div className="flex flex-col w-1/2 p-8">
          <h3 className="text-xl font-bold">Contato:</h3>
          <div className="flex gap-5 py-4">
            <Instagram size={24} />
            <Facebook size={24} />
            <Twitter size={24} className="ml-1" />
          </div>
          <p className="mt-4 text-sm">Whatsapp: (83) 99932-8569</p>
          <p className="mt-4 text-sm">
            Endereço: Av. Olímpio Gomes, 7, Box 13 - Centro, Monteiro - PB
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center py-8 text-sm bg-black">
        <p>Livraria Paraíba &copy; 2024. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
