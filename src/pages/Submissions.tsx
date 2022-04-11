import React from 'react';

interface results {
    count: number,
    next: string,
    previous: string,
    results: {
        id: number,
        answer: {
            form_field: number,
            value: string,
        }[]
        form: {
            id: number,
            title: string,
        }
        created_date: string,
    }
}

export const Submission = (props: {
    formId: number;
}) => {
    const [results, setResults] = React.useState<results>();
}