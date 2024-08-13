'use client';
import Select from 'react-select/async';
import './MultiSelect.css';

interface IMultiSelectProps {
    values: any[];
    fieldName: string;
    disabled?: boolean;
    entityPath: string;
    labelKey: string;
    setFormValue: any;
}

export default function MultiSelect({
    values,
    fieldName,
    disabled,
    entityPath,
    labelKey,
    setFormValue,
}: IMultiSelectProps) {
    const searchEntitiesByName = async (name: string) => {
        const url = entityPath;

        const response = await fetch(
            url + '?' + new URLSearchParams({ name: name }),
            { cache: 'no-store' }
        );

        if (!response.ok) {
            throw new Error('Failed to fetch entities');
        }

        return response.json();
    };

    const getOptions = async (inputValue: string) => {
        const entities = await searchEntitiesByName(inputValue);
        const options = entities.map((entity: any) => ({
            value: entity,
            label: entity[labelKey],
        }));
        return options;
    };

    const filterOptions = (option: any, input: string, array: any[]) => {
        if (array && array.length) {
            for (let element of array) {
                if (element.label === option.label) {
                    return false;
                }
            }
        }
        return true;
    };

    return (
        <>
            <Select
                className="multi-select"
                classNames={{
                    control: () => 'multi-select-control',
                    indicatorSeparator: () =>
                        'multi-select-indicator-separator',
                    indicatorsContainer: () =>
                        'multi-select-indicator-container',
                    option: () => 'multi-select-option',
                    menu: () => 'multi-select-menu',
                    multiValue: () => 'multi-select-multivalue',
                    placeholder: () => 'multi-select-placeholder',
                    input: () => 'multi-select-input',
                    valueContainer: () => 'multi-select-value-container',
                }}
                value={values}
                hideSelectedOptions={true}
                loadOptions={getOptions}
                closeMenuOnSelect={false}
                isMulti
                isSearchable
                defaultOptions
                isDisabled={disabled}
                onChange={(e: any) => {
                    setFormValue(fieldName, e);
                }}
                filterOption={(option, __) => filterOptions(option, __, values)}
            />
        </>
    );
}
