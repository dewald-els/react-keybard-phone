type ModalProps = {
	isOpen: boolean;
	text: string;

}
const Modal = (props: ModalProps) => {
	const { text, isOpen } = props;

	return (
		<>
			{isOpen && <div className="modal">
				<div className="modal__content">
					{text}
				</div>
			</div>}
		</>
	);
};

export default Modal;
