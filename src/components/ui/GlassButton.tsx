"use client";
type Props = {
  text: string;
  customClass: string;
};

const GlassButton = ({ text , customClass }: Props) => {
  return (
    <div
      className={`flex justify-center items-center px-[10px] py-[7px] absolute rounded-full border border-white backdrop-blur-[10px] z-10 max-xl:scale-[80%] max-lg:scale-100 ${customClass}`}
      style={{
        background:
          "linear-gradient(94.89deg, rgba(153,153,153,0.3) -31.56%, rgba(255,255,255,0) 104.74%)",
      }}
    >
      <span className="text-headings text-[16px] peyda font-medium">{text}</span>
    </div>
  );
};

export default GlassButton;
