/* eslint-disable max-len */
import { expect } from 'chai';
import { cleanUp, migrate } from '../../src/config/database';

// eslint-disable-next-line max-len
import * as ProfessionalService from '../../src/services/professional.service';
import * as ProfessionalTypeService from '../../src/services/professional-type.service';

describe('Professional', () => {
  describe('Get all professional types', () => {
    before(() => cleanUp());

    it('should return an empty array', () =>
      ProfessionalService.getAllProfessionals().then(
        (result) => expect(result).to.be.an('array').that.is.empty
      ));

    it('should not return a invalid professional with invalid professional type', () =>
      ProfessionalService.newProfessional({
        name: 'João Lima dos Santos Filho',
        phoneNumber: '8134659115',
        mailAddress: 'joao.lima@gmail.com',
        professionalTypeId: 1
      }).catch((error) =>
        expect(error.message).to.match(
          /^(?=.*\bprofessionalType\b)(?=.*\bnot found\b).*$/
        )
      ));

    it('should not change a invalid professional that not exists', () =>
      ProfessionalService.updateProfessional(1, {
        name: 'João Lima dos Santos Filho'
      }).catch((error) =>
        expect(error.message).to.match(
          /^(?=.*\bprofessional\b)(?=.*\bnot found\b).*$/
        )
      ));

    it('should not erase a invalid professional that not exists', () =>
      ProfessionalService.deleteProfessional(1).catch((error) =>
        expect(error.message).to.match(
          /^(?=.*\bprofessional\b)(?=.*\bnot found\b).*$/
        )
      ));

    it('should not retrieve a invalid professional that not exists', () =>
      ProfessionalService.getProfessional(1).catch((error) =>
        expect(error.message).to.match(
          /^(?=.*\bprofessional\b)(?=.*\bnot found\b).*$/
        )
      ));

    describe('should return an fullied array', () => {
      before(() => migrate());

      it('', async () =>
        ProfessionalService.getAllProfessionals().then(
          (result) => expect(result).to.be.an('array').that.is.not.empty
        ));
    });
  });

  describe('get one professional', () => {
    before(() => migrate());

    it('should retrieve a valid professional', () =>
      ProfessionalService.getProfessional(1).then((result) => {
        expect(result).to.be.an('object');
        expect(result).to.have.keys([
          'id',
          'name',
          'phoneNumber',
          'mailAddress',
          'professionalTypeId',
          'type',
          'situation',
          'createdAt',
          'updatedAt'
        ]);
        expect(result.id).to.be.a('number').that.is.equal(1);
        expect(result.name).to.be.a('string');
        expect(result.professionalTypeId)
          .to.be.a('number')
          .that.is.greaterThanOrEqual(1);
        expect(result.type).to.be.a('object');
        expect(result.type.id)
          .to.be.a('number')
          .that.is.equal(result.professionalTypeId);
        expect(result.situation).to.be.a('boolean');
        expect(result.createdAt).to.be.a('date').that.is.lessThan(new Date());
        expect(result.updatedAt).to.be.a('date').that.is.lessThan(new Date());
      }));

    it('should not retrieve a invalid professional with invalid id', () =>
      ProfessionalService.getProfessional('0').catch((error) =>
        expect(error.message).to.match(/^(?=.*\id\b)(?=.*\bnumber\b).*$/)
      ));
  });

  describe('create one professional', () => {
    it('should return a valid professional', () =>
      ProfessionalService.newProfessional({
        name: 'João Lima dos Santos Filho',
        phoneNumber: '8134659115',
        mailAddress: 'joao.lima@gmail.com',
        professionalTypeId: 1
      }).then((result) => {
        expect(result).to.be.an('object');
        expect(result).to.have.keys([
          'id',
          'name',
          'phoneNumber',
          'mailAddress',
          'professionalTypeId',
          'situation',
          'createdAt',
          'updatedAt'
        ]);
        expect(result.id).to.be.a('number').that.is.greaterThanOrEqual(1);
        expect(result.name).to.be.a('string');
        expect(result.professionalTypeId).to.be.a('number').that.is.equal(1);
        expect(result.situation).to.be.a('boolean').that.is.equal(true);
        expect(result.createdAt).to.be.a('date').that.is.lessThan(new Date());
        expect(result.updatedAt).to.be.a('date').that.is.lessThan(new Date());
      }));

    it('should not return a invalid professional without data', () =>
      ProfessionalService.newProfessional().catch((error) =>
        expect(error.message).to.match(/^(?=.*\bname\b)(?=.*\brequired\b).*$/)
      ));
    it('should not return a invalid professional with invalid phone number', () =>
      ProfessionalService.newProfessional({
        name: 'João Lima dos Santos Filho',
        phoneNumber: '0000000000000000'
      }).catch((error) =>
        expect(error.message).to.match(
          /^(?=.*\bphoneNumber\b)(?=.*\bphone number\b).*$/
        )
      ));

    it('should not return a invalid professional with invalid mail address', () =>
      ProfessionalService.newProfessional({
        name: 'João Lima dos Santos Filho',
        phoneNumber: '8134659115',
        mailAddress: 'joao.lima'
      }).catch((error) =>
        expect(error.message).to.match(
          /^(?=.*\bmailAddress\b)(?=.*\bvalid email\b).*$/
        )
      ));

    it('should not return a invalid professional type with extra properties', () =>
      ProfessionalService.newProfessional({
        id: 1,
        name: 'João Lima dos Santos Filho',
        phoneNumber: '8134659115',
        mailAddress: 'joao.lima@gmail.com',
        professionalTypeId: 1
      }).catch((error) =>
        expect(error.message).to.match(/^(?=.*\bid\b)(?=.*\bnot allow).*$/)
      ));
  });

  describe('update one professional type', () => {
    beforeEach(() => migrate());

    it('should change a valid professional type', () =>
      ProfessionalService.getAllProfessionals().then(
        // eslint-disable-next-line no-unused-vars
        ([{ id }, ..._]) =>
          ProfessionalService.updateProfessional(id, {
            name: 'João Lima dos Santos Filho'
          }).then((result) => {
            expect(result).to.be.an('object');
            expect(result).to.have.keys([
              'id',
              'name',
              'phoneNumber',
              'mailAddress',
              'professionalTypeId',
              'situation',
              'createdAt',
              'updatedAt'
            ]);
            expect(result.id).to.be.a('number').that.is.greaterThanOrEqual(1);
            expect(result.name)
              .to.be.a('string')
              .that.is.equal('João Lima dos Santos Filho');
            expect(result.professionalTypeId).to.be.a('number');
            expect(result.situation).to.be.a('boolean').that.is.equal(true);
            expect(result.createdAt)
              .to.be.a('date')
              .that.is.lessThan(new Date());
            expect(result.updatedAt)
              .to.be.a('date')
              .that.is.lessThan(new Date());
          })
      ));

    it('should not change professional type id', () =>
      ProfessionalService.getAllProfessionals().then(
        // eslint-disable-next-line no-unused-vars
        ([{ id }, ..._]) =>
          ProfessionalService.updateProfessional(id, {
            id: 0,
            name: 'João Lima dos Santos Filho'
          }).catch((error) =>
            expect(error.message).to.match(/^(?=.*\bid\b)(?=.*\bnot allow).*$/)
          )
      ));

    it('should not change professional type id', async () => {
      await ProfessionalTypeService.deleteProfessionalType(1);
      return ProfessionalService.getAllProfessionals().then(
        // eslint-disable-next-line no-unused-vars
        ([{ id }, ..._]) =>
          ProfessionalService.updateProfessional(id, {
            name: 'João Lima dos Santos Filho',
            professionalTypeId: 1
          }).catch((error) =>
            expect(error.message).to.match(
              /^(?=.*\bprofessionalType\b)(?=.*\bnot found).*$/
            )
          )
      );
    });

    it('should not change a invalid professional type with extra properties', async () =>
      ProfessionalService.getAllProfessionals().then(
        // eslint-disable-next-line no-unused-vars
        ([{ id }, ..._]) =>
          ProfessionalService.updateProfessional(id, {
            id,
            name: 'João Lima dos Santos Filho'
          }).catch((error) => {
            expect(error.message).to.match(/^(?=.*\bid\b)(?=.*\bnot allow).*$/);
          })
      ));
  });

  describe('delete one professional type', () => {
    before(() => migrate());

    it('should erase a valid professional type', () =>
      ProfessionalService.deleteProfessional(1).then((result) =>
        expect(result).to.be.an('string').to.equal('')
      ));
  });
});
