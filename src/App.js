import { useEffect, useRef, useState } from "react";

export default function App() {
  const [isOpen, setOpen] = useState(false);

  // useRef hook'u ile bir ref oluşturuyoruz
  const modalRef = useRef(null);

  //dialog elementinin üzerinde showModal fonksiyonunu kullanmak için, bir ref oluşturarak bu refi dialog elementine atamamız gerekiyor.
  //  react ile ref kullanımı biraz farklı oldugu icin showModal fonksiyonu doğrudan çalıştırılamaz.
  //Bunun yerine, refi kullanarak modal'ı kontrol etmek daha doğrudur.

  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }

  //Bu useEffect bloğu, isOpen değeri değiştiğinde çalışacak.
  //Amaç, modal açıldığında (isOpen true olduğunda) ve modal DOM elemanı (modalRef.current) mevcut olduğunda showModal fonksiyonunu çağırmak.
  useEffect(() => {
    // Modal açık olduğunda, ref ile showModal fonksiyonunu çağır
    if (isOpen && modalRef.current) {
      modalRef.current.showModal(); // showModal, bir <dialog> elemanının tarayıcı tarafından sağlanan bir fonksiyonudur ve tarayıcı tarafından tarayıcıya özgü bir modal penceresi açar.
    } else {
      // Modal kapalı olduğunda, ref ile close fonksiyonunu çağır
      modalRef.current.close(); // close, bir <dialog> elemanının tarayıcı tarafından sağlanan bir fonksiyonudur ve tarayıcı tarafından tarayıcıya özgü bir modal penceresini kapatır.
    }
  }, [isOpen]);

  return (
    <>
      <button onClick={openModal}>Modalı aç</button>
      <Modal modalRef={modalRef}>
        <h1 className="pb-2 text-lg font-bold">Modal açık</h1>
        <button onClick={closeModal}>Kapat</button>
      </Modal>
    </>
  );
}

function Modal({ children, modalRef }) {
  return (
    <dialog ref={modalRef} className="border-2 border-black p-4">
      {children}
    </dialog>
  );
}
//useRef hook'u ile bir modalRef oluşturuldu.
//Ardından, useEffect hook'u kullanılarak isOpen değeri değiştiğinde modal'ın açılması veya kapanması sağlandı.
//Modal bileşenine, oluşturulan modalRefi geçerek modal'ı kontrol etmek mümkün hale getirildi.
// Ancak, showModal fonksiyonu kullanılarak değil, open ve close fonksiyonları kullanılarak modal kontrol edildi.
