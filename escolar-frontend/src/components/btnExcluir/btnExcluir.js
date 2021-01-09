import React, { useState } from 'react';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';



// Icones
import { BsTrash, BsCheckCircle } from "react-icons/bs";
import { TiCancel } from "react-icons/ti";



function BtnExcluir(props) {

    const [popoverOpen, setPopoverOpen] = useState(false);
  
    const toggle = () => setPopoverOpen(!popoverOpen);
  
    return (
      <div>
        <Button
          color="danger"
          type="button"
          id={"Popover-" + props.id}>
          <BsTrash />
        </Button>
        <Popover
          // placement={item.placement}
          isOpen={popoverOpen}
          target={"Popover-" + props.id}
          toggle={toggle}
        >
          <PopoverHeader><strong>Excluir</strong></PopoverHeader>
          <PopoverBody>
            <BsTrash size={30} />
            Tem certeza que deseja excluir o registro <strong>{props.name}</strong>?
          </PopoverBody>
          <div className="popover-footer">
            <Button type="button" onClick={() => { props.onClick(props.id); toggle() }} color="danger"><BsCheckCircle size={18} /> Confirmar</Button>
            <Button type="button" onClick={toggle} color="secondary"><TiCancel size={22} /> Cancelar</Button>
          </div>
        </Popover>
      </div>
    );
  }
  
  export default BtnExcluir;