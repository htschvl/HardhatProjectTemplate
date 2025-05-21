import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("ExampleModule", (m) => {
  // Usa a conta do deployer padrão (primeira conta)
  const deployer = m.getAccount(0);

  // Deploya o contrato Example com initialOwner = deployer.address
  const example = m.contract("Example", [deployer]);

  // Só retorna o contrato, nada mais
  return { example };
});
