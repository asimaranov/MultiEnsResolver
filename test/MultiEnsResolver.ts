import {
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("MultiEnsResolver", function () {
  async function deployFixture() {
    const MultiEnsResolver = await ethers.getContractFactory("MultiEnsResolver");
    const multiEnsResolver = await MultiEnsResolver.deploy('0xE4Acdd618deED4e6d2f03b9bf62dc6118FC9A4da');

    const TEST_NAME_1 = 'ethkeeper.eth';
    const TEST_NAME_2 = 'alexzoid.eth';

    const TEST_NAME_1_ADDRESS = '0x0e63EE1a039bCC422b1bAaF65C7aE30C497d3FC8';
    const TEST_NAME_2_ADDRESS = '0x44A1BA1286e7dD623aA5d930437ae117A31332C5';

    const TEST_NAME_1_AVATAR = '';
    const TEST_NAME_2_AVATAR = 'https://alexzoid.com/f/zoid.png';

    return { 
      multiEnsResolver, 
      TEST_NAME_1, TEST_NAME_2, 
      TEST_NAME_1_ADDRESS, TEST_NAME_2_ADDRESS, 
      TEST_NAME_1_AVATAR, TEST_NAME_2_AVATAR 
    };
  }

  describe("Deployment", function () {
    it("Test reverse resolving", async function () {
      const { 
        multiEnsResolver, 
        TEST_NAME_1, TEST_NAME_2, 
        TEST_NAME_1_ADDRESS, TEST_NAME_2_ADDRESS 
      } = await loadFixture(deployFixture);

      const resp = await multiEnsResolver['resolveAddresses(address[],string[])']([TEST_NAME_1_ADDRESS, TEST_NAME_2_ADDRESS], []);

      expect(resp[0]).to.eql([TEST_NAME_1, TEST_NAME_2]);
      expect(resp[1]).to.eql([[], []]);
    });

    it("Test forward resolving", async function () {
      const { 
        multiEnsResolver, 
        TEST_NAME_1, TEST_NAME_2, 
        TEST_NAME_1_ADDRESS, TEST_NAME_2_ADDRESS 
      } = await loadFixture(deployFixture);
      
      const resp = await multiEnsResolver['resolveNames(string[],string[])']([TEST_NAME_1, TEST_NAME_2], []);

      expect(resp[0]).to.eql([TEST_NAME_1_ADDRESS, TEST_NAME_2_ADDRESS]);
      expect(resp[1]).to.eql([[], []]);
    });

    it("Test reverse avatar resolving", async function () {
      const { 
        multiEnsResolver, 
        TEST_NAME_1, TEST_NAME_2, 
        TEST_NAME_1_ADDRESS, TEST_NAME_2_ADDRESS, 
        TEST_NAME_1_AVATAR, TEST_NAME_2_AVATAR 
      } = await loadFixture(deployFixture);

      const resp = await multiEnsResolver['resolveAddresses(address[],string[])']([TEST_NAME_1_ADDRESS, TEST_NAME_2_ADDRESS], ['avatar']);

      expect(resp[0]).to.eql([TEST_NAME_1, TEST_NAME_2]);
      expect(resp[1]).to.eql([[TEST_NAME_1_AVATAR], [TEST_NAME_2_AVATAR]]);
    });

    it("Test forward avatar resolving", async function () {
      const { 
        multiEnsResolver, 
        TEST_NAME_1, TEST_NAME_2, 
        TEST_NAME_1_ADDRESS, TEST_NAME_2_ADDRESS, 
        TEST_NAME_1_AVATAR, TEST_NAME_2_AVATAR 
      } = await loadFixture(deployFixture);

      const resp = await multiEnsResolver['resolveNames(string[],string[])']([TEST_NAME_1, TEST_NAME_2], ['avatar']);

      expect(resp[0]).to.eql([TEST_NAME_1_ADDRESS, TEST_NAME_2_ADDRESS]);
      expect(resp[1]).to.eql([[TEST_NAME_1_AVATAR], [TEST_NAME_2_AVATAR]]);
    });
  });
});
