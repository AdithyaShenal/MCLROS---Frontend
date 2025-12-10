interface ModalProps {
  show: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}

interface FarmerForm {
  name: string;
  nic: string;
  contact: string;
  farmType: string;
  capacity: string;
  location: string;
}
export default function FarmerForm({ show, onClose, onSave }: ModalProps) {}
