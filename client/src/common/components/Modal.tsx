interface Props {
    showModal: boolean;
    onRequestClose: (data?: any) => void;
    children?: React.ReactNode;
}

const Modal = ({ showModal, onRequestClose, children }: Props) => {
    return showModal ? (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-opacity-60 bg-gray-700"
            onClick={() => onRequestClose()}
        >
            <div
        className="bg-white w-full max-w-md rounded-md relative"
                onClick={(e) => { e.stopPropagation(); }}>
                {children}
            </div>
        </div>
    ) : null;
};

export default Modal;
