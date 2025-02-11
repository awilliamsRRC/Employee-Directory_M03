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
exports.serviceDeleteBranches = exports.serviceUpdateBranches = exports.serviceCreateBranches = exports.serviceGetAllBranches = void 0;
const branches = [];
const serviceGetAllBranches = () => __awaiter(void 0, void 0, void 0, function* () {
    return branches;
});
exports.serviceGetAllBranches = serviceGetAllBranches;
const serviceCreateBranches = (branch) => __awaiter(void 0, void 0, void 0, function* () {
    // the ... is the spread operator in js/ts and is the same as writing { name: item.name, description: item.description }
    const newBranch = Object.assign({ id: Date.now().toString() }, branch);
    // adding the new item to the global scoped array of Items
    branches.push(newBranch);
    return newBranch;
});
exports.serviceCreateBranches = serviceCreateBranches;
const serviceUpdateBranches = (id, branchUpdate) => __awaiter(void 0, void 0, void 0, function* () {
    // retieve the item's index from the items array by comparing the item ids
    const index = branches.findIndex((i) => i.id === id);
    // if the index is not found we expects a -1
    if (index === -1) {
        throw new Error(`Item with ID ${id} not found`);
    }
    // assign the new value of the found index
    branches[index] = Object.assign(Object.assign({}, branchUpdate), { id: branches[index].id });
    return branches[index];
});
exports.serviceUpdateBranches = serviceUpdateBranches;
const serviceDeleteBranches = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const index = branches.findIndex((i) => i.id === id);
    if (index === -1) {
        throw new Error(`Item with ID ${id} not found`);
    }
    // remove the item from the Item array, start the delete form the index and only delete 1 index
    branches.splice(index, 1);
});
exports.serviceDeleteBranches = serviceDeleteBranches;
