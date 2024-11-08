const { createNamespace, getNamespace } = require('cls-hooked');
const myNamespace = 'test123';
const moment = require('moment');



const create = async () => {
    const applicationNamespace = await createNamespace(myNamespace);

    console.log('** in method create, applicationNamespace: ', applicationNamespace);

    await applicationNamespace.run(async () => {
        applicationNamespace.set('testId', moment.utc().format('X') );
    });
    
    console.log('************************************ in method create, operation completed...');
};

const get = async () => {
    const applicationNamespace = getNamespace(myNamespace);
    console.log('** in method get, applicationNamespace: ', applicationNamespace);
    const testId = getNamespace(myNamespace).get('testId');
   
    console.log('** in method get, testId: ', testId);
};

const testFunc = async () => {
    await create();
    await get();
}

testFunc();


                