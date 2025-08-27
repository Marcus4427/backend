import {soma} from'./index.js';
if (soma(1,1) === 2)
    console.log("Passou");
 else console.error("Deu ruim");

if (soma(1,0) === 1)
    console.log("Passou");
 else console.error("Deu ruim");

if (soma(1, -1) === 0)
    console.log("Passou");
 else console.error("Deu ruim");