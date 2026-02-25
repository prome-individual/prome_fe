import { useState } from 'react';

interface UseModalReturn {
    isModalVisible: boolean;
    openModal: () => void;
    closeModal: () => void;
    toggleModal: () => void;
}

const useModal = (): UseModalReturn => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const openModal = () => {
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    const toggleModal = () => {
        setIsModalVisible(prev => !prev);
    };

    return {
        isModalVisible,
        openModal,
        closeModal,
        toggleModal,
    };
};

export default useModal;
