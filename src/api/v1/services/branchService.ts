export type Branch = {
    id: string;
    name: string;
    address: string;
    phone:string;
};

const branches: Branch[] = [];

export const serviceGetAllBranches = async (): Promise<Branch[]> => {
    return branches;
};

export const serviceCreateBranches = async (branch: {
    name: string;
    address: string;
    phone: string;
}): Promise<Branch> => {
    const newBranch: Branch = { id: Date.now().toString(), ...branch };

    
    branches.push(newBranch);
    return newBranch;
};

export const serviceUpdateBranches = async (
    id: string,
    branchUpdate: Branch
): Promise<Branch> => {
    
    const index: number = branches.findIndex((i) => i.id === id);
    // if the index is not found we expects a -1
    if (index === -1) {
        throw new Error(`Item with ID ${id} not found`);
    }

    
    branches[index] = {   ...branchUpdate, id: branches[index].id };

    return branches[index];
};

export const serviceDeleteBranches = async (id: string): Promise<void> => {
    const index: number = branches.findIndex((i) => i.id === id);
    if (index === -1) {
        throw new Error(`Item with ID ${id} not found`);
    }

    
    branches.splice(index, 1);
};