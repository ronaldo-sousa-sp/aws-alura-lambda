export const handler = async (event) => {

    const example_var = process.env.EXAMPLE_VAR || 'default_value';

    const response = {
        statusCode: 200,
        body: JSON.stringify(event),
    };

    console.log('Log example: ', {event, example_var});

    return response;
};
