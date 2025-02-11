"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceDeleteEmployee = exports.serviceUpdateEmployee = exports.serviceCreateEmployee = exports.serviceGetAllEmployees = void 0;
const employees = [];
const serviceGetAllEmployees = () => __awaiter(void 0, void 0, void 0, function* () {
    return employees;
});
exports.serviceGetAllEmployees = serviceGetAllEmployees;
const serviceCreateEmployee = (employee) => __awaiter(void 0, void 0, void 0, function* () {
    // the ... is the spread operator in js/ts and is the same as writing { name: item.name, description: item.description }
    const newEmployee = Object.assign({ id: Date.now().toString() }, employee);
    // adding the new item to the global scoped array of Items
    employees.push(newEmployee);
    return newEmployee;
});
exports.serviceCreateEmployee = serviceCreateEmployee;
const serviceUpdateEmployee = (id, employeeUpdate) => __awaiter(void 0, void 0, void 0, function* () {
    // retieve the item's index from the items array by comparing the item ids
    const index = employees.findIndex((i) => i.id === id);
    // if the index is not found we expects a -1
    if (index === -1) {
        throw new Error(`Item with ID ${id} not found`);
    }
    // assign the new value of the found index
    employees[index] = Object.assign(Object.assign({}, employeeUpdate), { id: employees[index].id });
    return employees[index];
});
exports.serviceUpdateEmployee = serviceUpdateEmployee;
const serviceDeleteEmployee = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const index = employees.findIndex((i) => i.id === id);
    if (index === -1) {
        throw new Error(`Item with ID ${id} not found`);
    }
    // remove the item from the Item array, start the delete form the index and only delete 1 index
    employees.splice(index, 1);
});
exports.serviceDeleteEmployee = serviceDeleteEmployee;
