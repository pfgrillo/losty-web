import { selectUser } from '../../../store/features/userSlice';
import CardBox from '../../../common/components/Cards';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Modal from '../../../common/components/Modal';
import Button from '../../../common/components/Button';

type Props = {
  className?: string
}

const CardBoxUser = ({ className }: Props) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const user = useSelector(selectUser);
  const [avatarColor, setAvatarColor] = useState<string>('bg-main');

  const openModal = () => {
    setShowModal((prev) => !prev);
  }


  return (
    <>
      <CardBox className={className}>
        <div className="flex flex-col lg:flex-row lg:items-center lggit:justify-around sm:flex-row sm:items-center sm:justify-around">
          <div className={`flex justify-center items-center ${avatarColor} text-white text-2xl h-[100px] w-[100px] rounded-full`}
            onClick={() => openModal()}>
            {user.name?.substring(0, 1).toUpperCase()}
          </div>
          <div className="space-y-3 text-center md:text-left lg:mx-12">
            <h1 className="text-2xl text-black">
              Hi, <b>{user.username}</b>!
            </h1>
            <div className="flex flex-col">
              {user.chats.length > 0 && <div>You have new messages!</div>}
              <div>Items found: 2</div>
              <div>Items lost: 3</div>
            </div>
          </div>
        </div>
      </CardBox>
      <Modal onRequestClose={() => { }} showModal={showModal}>
        <CardBox title="Choose an avatar color">
          <div className='flex gap-3 justify-center m-3'>
            {['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500', 'bg-blue-500', 'bg-main'].map((color, index) => (
              <div key={index} className={`flex justify-center items-center ${color} text-white text-2xl h-[50px] w-[50px] rounded-full`}
                onClick={() => setAvatarColor(color)}
              ></div>
            ))}
          </div>
          <div className="flex flex-row justify-around m-3">
            <Button className="p-2" label="Delete" color="main" />
            <Button className="p-2" label="Cancel" color="transparent" onClick={() => setShowModal((prev) => !prev)} />
          </div>
        </CardBox>
      </Modal>
    </>
  )
}

export default CardBoxUser
