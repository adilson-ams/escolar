import React, { useEffect, useRef } from 'react'
import { useField } from '@unform/core';
import { FormGroup, Label, FormText } from 'reactstrap';
import './styles.css';



export default function Select({ name, label, obrigatorio = false, selected, datasource = [], ...rest }) {

    const inputRef = useRef(null);
    const { fieldName, registerField, error, clearError } = useField(name);
 

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: "value"
        });
    }, [fieldName, registerField]);

    return (
        <FormGroup >
            <Label for={fieldName}>{label} {obrigatorio && <span className="required">*</span>}</Label>
            <select
                id={fieldName}
                ref={inputRef}
                className={error ? 'form-control is-invalid' : 'form-control'}
                onFocus={clearError}
                name={fieldName}
                {...rest} >

                {datasource.map(function (item, i) {
                    return selected === item.value ? renderOptionSelected(item, i) : renderOption(item, i)
                })}

            </select>


            {error && <FormText color="danger">{error}</FormText>}
        </FormGroup>
    )


    function renderOptionSelected(item, i) {
        return (
            <option
                selected="selected"
                key={"select-" + "-" + i}
                value={item.value}>
                {item.descricao}
            </option>
        );
    }

    function renderOption(item, i) {
        return (
            <option
                key={"select-" + "-" + i}
                value={item.value}>
                {item.descricao}
            </option>
        );
    }



} 