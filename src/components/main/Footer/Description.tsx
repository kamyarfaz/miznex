import MiznexSVG from "@/assets/svg/MiznexSVG";
import { MotionDiv } from "@/utils/MotionWrapper";

const Description = () => {
  return (
    <div className="space-y-3">
      <MotionDiv
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-2">
          <MiznexSVG />
          <h3 className="text-theme-xl font-bold text-action">میزنکس</h3>
        </div>
        <p className="text-bodyDark leading-[26px] font-light mt-4">پلتفرم هوشمند ساخت منوی دیجیتال برای رستوران‌ها و کافه‌ها با امکانات مدیریت موجودی و آمارگیری پیشرفته.</p>
      </MotionDiv>
    </div>
  );
};

export default Description;
