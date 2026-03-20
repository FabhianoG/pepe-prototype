type WelcomeBannerProps = {
  name: string;
};

export default function WelcomeBanner({ name }: WelcomeBannerProps) {
  return (
    <div className="
      bg-linear-to-r
      from-[#c7e6f5] 
      via-[#a9d4f2] 
      to-[#8fb9e8]
      text-gray-900
      rounded-2xl 
      p-6 md:p-10
      shadow-md
    ">
      
      <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
        Hola, {name}
      </h1>

      <p className="mt-3 text-gray-700 max-w-2xl text-base md:text-lg">
        Bienvenido a <span className="font-semibold text-gray-900">PEPE AI</span>, 
        tu asistente inteligente de Misión Tecnológica. 
        Optimiza procesos, analiza información y potencia tus decisiones.
      </p>

    </div>
  );
}
