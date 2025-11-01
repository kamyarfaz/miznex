import { ContactInfoProps } from "@/types";
import { MotionDiv } from "@/utils/MotionWrapper";

const ContactInfo = ({ contactInfo }: ContactInfoProps) => {
  return (
    <div className="space-y-4 items-start h-full">
      <MotionDiv
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-t-dark font-medium flex items-center gap-2">
          <div className="w-1 h-[9px] bg-action rounded-full"></div> پشتیبانی
        </h3>
      </MotionDiv>

      <div className="space-y-3">
        {contactInfo.map((contact, index) => {
          return (
            <MotionDiv
              key={index}
              className="group flex items-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center justify-center">
                {contact.icon}
              </div>
              <span className="text-bodyDark text-sm font-medium">
                {contact.text}
              </span>
            </MotionDiv>
          );
        })}
      </div>
    </div>
  );
};

export default ContactInfo;
