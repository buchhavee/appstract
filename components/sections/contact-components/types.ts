import { MotionValue } from "framer-motion";

export interface Office {
  city: string;
  company: string;
  address: string;
  postalCity: string;
  phone: string;
}

export interface FormField {
  name: string;
  placeholder: string;
  type: string;
  required: boolean;
}

export interface Floating3DImageProps {
  src: string;
  alt: string;
  y: MotionValue<number>;
  rotate: MotionValue<number>;
  hoverAnimation: {
    y: number[];
    transition: {
      duration: number;
      repeat: number;
      ease: "easeInOut";
      delay?: number;
    };
  };
  positionClasses: string;
}

export interface OfficeCardProps {
  office: Office;
  index: number;
}

export interface ContactFormProps {
  fields: FormField[];
  submitButtonText: string;
  onSubmit: (e: React.FormEvent) => void;
}

export interface ConfirmationViewProps {
  headline: string;
  description: string;
  closeButtonText: string;
  onClose: () => void;
}

export interface ContactModalProps {
  open: boolean;
  submitted: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
}
